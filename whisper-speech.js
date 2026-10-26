'use strict';
/*
 * Browser-independent speech-to-text for the independent Oatly student prototype.
 * The multilingual Whisper model is downloaded on the user's first microphone press
 * and inferred on-device using Transformers.js + ONNX Runtime WebAssembly.
 * No audio is sent to an external recognition service by this mode.
 * The optional legacy browser mode remains available for supported browsers.
 */
(function () {
  const lang=()=>($('voice-language')?.value==='sv-SE'?'sv':'en');
  const tr=(en,sv)=>lang()==='sv'?sv:en;
  const mic=$('mic'), toolbar=document.querySelector('.voice-toolbar');
  if(!mic || !toolbar || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;

  let independentMode=true;
  let transcriptModel=null,loadingModel=null;
  let recorder=null,stream=null,recordingTimer=null,recording=false,working=false,discardRecording=false;
  const MAX_SECONDS=14;
  const controls=document.createElement('div');
  controls.className='independent-voice';
  controls.innerHTML='<button type="button" id="voice-engine" aria-pressed="true"></button><span id="voice-engine-description"></span>';
  toolbar.insertAdjacentElement('afterend',controls);
  const modeButton=$('voice-engine'),modeDescription=$('voice-engine-description');

  function status(en,sv,kind='info'){
    voiceStatus('• '+tr(en,sv),kind);
  }
  function updateMode(){
    modeButton.textContent=independentMode
      ? tr('✓ Independent voice (Whisper)','✓ Oberoende röst (Whisper)')
      : tr('Browser voice (may fail in Brave)','Webbläsarröst (kan fallera i Brave)');
    modeButton.setAttribute('aria-pressed',String(independentMode));
    modeDescription.textContent=independentMode
      ? tr('English + Swedish · speech stays on device · first use downloads a model','Engelska + svenska · tal bearbetas på enheten · modellen hämtas första gången')
      : tr('Uses the browser speech provider. May be unavailable in Brave.','Använder webbläsarens taltjänst. Kan saknas i Brave.');
  }
  function setMic(label,active){
    mic.textContent=active?'■':'🎙';
    mic.setAttribute('aria-pressed',String(active));
    mic.setAttribute('aria-label',active
      ?tr('Stop and transcribe voice input','Stoppa och transkribera tal')
      :tr('Start independent voice input','Starta oberoende röstinmatning'));
    mic.title=label;
  }
  modeButton.addEventListener('click',()=>{
    if(recording||working)return;
    independentMode=!independentMode;
    updateMode();
    setMic('',false);
    status(
      independentMode?'Independent on-device voice selected. Press the microphone to load the model and speak.':'Browser voice selected. This requires your browser speech service.',
      independentMode?'Lokal taligenkänning är vald. Tryck på mikrofonen för att ladda modellen och tala.':'Webbläsarens taligenkänning är vald. Den kräver webbläsarens taltjänst.'
    );
  });
  updateMode();
  const languageWatch=new MutationObserver(updateMode);
  languageWatch.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  async function loadWhisper(){
    if(transcriptModel)return transcriptModel;
    if(loadingModel)return loadingModel;
    loadingModel=(async()=>{
      status('Loading independent English/Swedish speech recognition. The first use downloads model files (tens of MB). Please wait…',
             'Laddar oberoende taligenkänning för engelska och svenska. Första gången hämtas modellfiler (tiotals MB). Vänta …','loading');
      const {pipeline,env}=await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1');
      env.allowLocalModels=false;
      env.useBrowserCache=true;
      env.backends.onnx.wasm.numThreads=1;
      const model=await pipeline('automatic-speech-recognition','onnx-community/whisper-tiny',{
        device:'wasm',dtype:'q8',
        progress_callback:info=>{
          if(info?.status==='progress' && Number.isFinite(info.progress)){
            const pct=Math.min(100,Math.max(0,Math.round(info.progress)));
            status('Downloading speech model: '+pct+'% of '+(info.file||'model'),
                   'Hämtar talmodell: '+pct+' % av '+(info.file||'modell'),'loading');
          }
        }
      });
      transcriptModel=model;
      return model;
    })();
    try{return await loadingModel;}
    catch(error){
      loadingModel=null;
      throw error;
    }finally{if(transcriptModel)loadingModel=null;}
  }
  function cleanup(){
    if(recordingTimer){clearTimeout(recordingTimer);recordingTimer=null;}
    if(stream){stream.getTracks().forEach(track=>track.stop());stream=null;}
    recorder=null;recording=false;
    setMic('',false);
  }
  async function convertTo16kHz(blob){
    const ctx=new (window.AudioContext||window.webkitAudioContext)();
    let decoded;
    try{decoded=await ctx.decodeAudioData(await blob.arrayBuffer());}
    finally{await ctx.close();}
    if(!decoded.length || !decoded.numberOfChannels)throw Error('empty decoded audio');
    const sampleRate=16000;
    const outputLength=Math.max(1,Math.ceil(decoded.duration*sampleRate));
    const offline=new OfflineAudioContext(1,outputLength,sampleRate);
    const source=offline.createBufferSource();
    source.buffer=decoded;
    source.connect(offline.destination);
    source.start();
    const resampled=await offline.startRendering();
    return new Float32Array(resampled.getChannelData(0));
  }
  async function transcribe(blob){
    working=true;
    try{
      if(!blob.size){status('No audio was recorded. Please try again.','Inget ljud spelades in. Försök igen.','warn');return;}
      status('Transcribing on your device. This can take a while, especially the first time…',
             'Omvandlar tal till text på din enhet. Det kan ta en stund, särskilt första gången …','loading');
      const audio=await convertTo16kHz(blob);
      const engine=await loadWhisper();
      const response=await engine(audio,{language:lang()==='sv'?'swedish':'english',task:'transcribe',max_new_tokens:96});
      const text=String(response?.text||'').trim();
      if(!text){
        status('No clear words were recognised. Try speaking more clearly or use text chat.',
               'Inga tydliga ord kunde identifieras. Tala tydligare eller skriv i chatten.','warn');
        return;
      }
      voiceAsked=true;
      status('Recognised: '+text,'Uppfattat: '+text);
      submitChat(text);
    }catch(error){
      status('On-device speech could not process the recording. Check your connection for the first model download and retry, or use text chat.',
             'Lokal taligenkänning kunde inte behandla inspelningen. Kontrollera anslutningen för den första nedladdningen och försök igen, eller skriv i chatten.','warn');
      console.warn('Independent STT transcription failed:',error?.name||'Error');
    }finally{working=false;mic.disabled=false;}
  }
  function stopRecording(discard=false){
    if(!recording||!recorder)return;
    discardRecording=discard;
    if(recorder.state!=='inactive')recorder.stop();
    recording=false;
    setMic('',false);
    if(!discard)status('Recording stopped. Preparing transcription…',
                       'Inspelningen stoppades. Förbereder transkribering …','loading');
  }
  async function startRecording(){
    working=true;mic.disabled=true;
    try{
      await loadWhisper();
      if(!independentMode)return;
      if(!window.MediaRecorder || !window.AudioContext || !window.OfflineAudioContext){
        throw Error('audio-recording-not-supported');
      }
      status('Model ready. Opening microphone…','Modellen är klar. Öppnar mikrofonen …','loading');
      stream=await navigator.mediaDevices.getUserMedia({
        video:false,audio:{echoCancellation:true,noiseSuppression:true,channelCount:1}
      });
      const types=['audio/webm;codecs=opus','audio/mp4','audio/webm','audio/ogg;codecs=opus'];
      const mime=types.find(t=>MediaRecorder.isTypeSupported(t));
      recorder=mime?new MediaRecorder(stream,{mimeType:mime}):new MediaRecorder(stream);
      const chunks=[];
      recorder.addEventListener('dataavailable',ev=>{if(ev.data?.size)chunks.push(ev.data);});
      recorder.addEventListener('error',()=>status('Audio recording failed. You can type your request instead.',
                                                        'Ljudinspelningen misslyckades. Du kan skriva din fråga i stället.','warn'));
      recorder.addEventListener('stop',()=>{
        const audio=new Blob(chunks,{type:recorder?.mimeType||mime||'audio/webm'});
        const ignore=discardRecording;
        cleanup();
        if(!ignore)void transcribe(audio);
      },{once:true});
      discardRecording=false;
      recorder.start();
      recording=true;
      setMic('',true);
      status('Listening. Speak now and press ■ to finish (maximum 14 seconds).',
             'Lyssnar. Prata nu och tryck på ■ när du är klar (högst 14 sekunder).','listening');
      recordingTimer=setTimeout(()=>stopRecording(),MAX_SECONDS*1000);
    }catch(error){
      cleanup();
      const msg=String(error?.name||'');
      if(msg==='NotAllowedError'){
        status('Microphone access was denied. Allow microphone access in this browser.',
               'Mikrofonåtkomst nekades. Tillåt mikrofonen i webbläsaren.','warn');
      }else{
        status('The independent voice engine could not load or record. Check that model downloads from Hugging Face and jsDelivr are not blocked, then retry. Text chat still works.',
               'Den oberoende talmotorn kunde inte laddas eller spela in. Kontrollera att Hugging Face och jsDelivr inte blockeras och försök igen. Textchatten fungerar fortfarande.','warn');
      }
      console.warn('Independent STT setup failed:',msg||'Error');
    }finally{
      working=false;mic.disabled=false;
    }
  }
  // Capture prevents app.js from contacting Brave's non-working speech provider.
  mic.addEventListener('click',ev=>{
    if(!independentMode)return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    if(recording){stopRecording();return;}
    if(working||mic.disabled)return;
    void startRecording();
  },true);
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden&&recording)stopRecording(true);
  });
  $('close-chat').addEventListener('click',()=>{if(recording)stopRecording(true);});
  window.OatlyIndependentSpeech={mode:()=>independentMode,modelLoaded:()=>!!transcriptModel};
})();