import React,{useEffect} from "react"
import * as Tone from 'tone'
import tmi from 'tmi.js'

function PlaySound() {
  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();

  //play a middle 'C' for the duration of an 8th note
  // synth.triggerAttackRelease("C4", "8n");
  // synth.triggerAttackRelease("E4", "4n");
  const now = Tone.now()
// trigger the attack immediately
synth.triggerAttack("C4", now)
// wait one second before triggering the release
synth.triggerRelease(now + 1)
}

export function App() {

  useEffect(()=>{
    const client = new tmi.Client({
	options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},

	channels: [ 'account_disabilitato' ]
});
client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
	if(self) return;
  if (message.toLowerCase().startsWith('!play')) {
    const [cmd, note,duration,...rest] = message.split(" ")
    const synth = new Tone.Synth().toDestination();

    //play a middle 'C' for the duration of an 8th note
    // synth.triggerAttackRelease("C4", "8n");
    // synth.triggerAttackRelease("E4", "4n");
    const now = Tone.now()
  // trigger the attack immediately
  synth.triggerAttack(note, now)
  // wait one second before triggering the release
  synth.triggerRelease(now + 1*Number(duration))
		client.say(channel, `@${tags.username}, heya!`);
	}
});
  },[])

    return (<>
    <h1>Hello world!</h1>
    <button onClick={()=>{Tone.start().then(()=>console.log("audio started"))}} >start audio</button>
    <button onClick={PlaySound} >play audio</button>
    </>)
  }