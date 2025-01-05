const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);

  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  var day = new Date();
  var hour = day.getHours();

  if (hour >= 0 && hour < 12) {
    speak("Good Morning Boss...");
  } else if (hour > 12 && hour < 17) {
    speak("Good Afternoon Master...");
  } else {
    speak("Good Evenining Sir...");
  }
}

window.addEventListener("load", () => {
  speak("Initializing JARVIS..");
  wishMe();
});

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript;
  content.textContent = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  content.textContent = "Listening....";
  recognition.start();
});
wishMe();

function takeCommand(message) {
  if (message.includes("hey") || message.includes("hello")) {
    speak("Hello Sir, How May I Help You?");
  } else if (message.includes("open google")) {
    window.open("https://google.com", "_blank");
    speak("Opening Google...");
  } else if (message.includes("open youtube")) {
    window.open("https://youtube.com", "_blank");
    speak("Opening Youtube...");
  } else if (message.includes("open facebook")) {
    window.open("https://facebook.com", "_blank");
    speak("Opening Facebook...");
  } else if (message.includes("open whatsapp")) {
    window.open("https://web.whatsapp.com/", "_blank");
    speak("Opening whatsapp...");
  } else if (message.includes("what is my name")) {
    speak(`${userName}`);
  } else if (
    message.includes("what is") ||
    message.includes("who is") ||
    message.includes("what are")
  ) {
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    const finalText = "This is what i found on internet regarding " + message;
    speak(finalText);
  } else if (message.includes("wikipedia")) {
    window.open(
      `https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`,
      "_blank"
    );
    const finalText = "This is what i found on wikipedia regarding " + message;
    speak(finalText);
  } else if (message.includes("77")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    const finalText = time;
    speak(finalText);
  } else if (message.includes("date")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    const finalText = date;
    speak(finalText);
  } else if (message.includes("calculator")) {
    window.open("https://calwb.netlify.app/");
    const finalText = "Opening Calculator";
    speak(finalText);
  } else if (message.includes("call me")) {
  /************************************************/
    userName = message.replace("call me", "").trim();
    speak(`Ok, I will call you ${userName}`);
  } else if (message.includes("open youtube")) {
    window.open("https://www.youtube.com");
  } else if (message.includes("open google")) {
    window.open("https://www.google.com");
    speak("Opening Google");
  } else if (message.includes("open stackoverflow")) {
    window.open("https://www.stackoverflow.com");
  } else if (message.includes("you know")) {
    const searchTerm = message.replace("you know", "").trim();

    speak(`Wait , I know` + userName);
    const summary = fetchWikipediaSummary(searchTerm);
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    responseElement.textContent = summary;
    speak(summary);
    speak(`That's all I know, ` + userName);
  } else if (message.includes("say this")) {
    const textToSay = message.replace("say this", "").trim();
    speak(textToSay);
  } else if (message.includes("type this")) {
    const textToType = message.replace("type this", "").trim();
    responseElement.textContent = textToType;
    speak("Ok" + userName);
  } else if (message.includes("type to say")) {
    const textToType = prompt("Type what you want me to say:");
    responseElement.textContent = textToType;
    speak(textToType);
  } else if (message.includes("hi tom")) {
    speak(`Hi ` + userName);
  } else if (message.includes("thank you")) {
    speak(`You're welcome ` + userName);
  } else if (message.includes("i am")) {
    userName = message.replace("i am", "").trim();
    speak(`Hi' + userName+ 'how are you? How can I call you?`);
  } else if (message.includes("tell about you")) {
    speak(
      "I am Tom, an artificial intelligence. I am here to help you. I am a nice assistant and I love to assist you. create by gokul"
    );
  } else if (message.includes("tell about gokul")) {
    speak(
      "Gokul is a nice person. He created me, and I want to thank Gokul for creating me."
    );
  } else if (message.includes("who created you")) {
    speak("Gokul create me .");
  } else if (message.includes("bye")) {
    speak(`Goodbye, .` + userName);
    speak("take care. Turning off");
    responseElement.textContent =
      "Thank you! This AI, named Tom, was created by Gokul.";
    return true;
  } else {
    speak("Sorry, I didn't understand that command.");
  }
  /* else{
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);}*/
}
