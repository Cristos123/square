'use client'

function talk(msg) {
  
const ctx = new SpeechSynthesisUtterance();
const female_US = speechSynthesis.getVoices()[5];
ctx.voice = female_US;
  ctx.text = msg;
  console.log(speechSynthesis.getVoices());
 globalThis.window?.speechSynthesis.speak(ctx);
}

export default talk;
