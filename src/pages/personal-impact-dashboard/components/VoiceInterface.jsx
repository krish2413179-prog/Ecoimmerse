import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';

const VoiceInterface = ({ onVoiceCommand, isListening, setIsListening }) => {
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [lastCommand, setLastCommand] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  const voiceCommands = [
    { phrase: "show my progress", action: "showProgress", description: "Display weekly impact data" },
    { phrase: "what\'s my impact", action: "showImpact", description: "Show overall environmental impact" },
    { phrase: "show achievements", action: "showAchievements", description: "Display earned badges" },
    { phrase: "set new goal", action: "setGoal", description: "Create a new environmental goal" },
    { phrase: "start recording", action: "startJournal", description: "Begin voice journal entry" },
    { phrase: "share progress", action: "shareProgress", description: "Generate social media card" }
  ];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event?.resultIndex; i < event?.results?.length; i++) {
          const transcript = event?.results?.[i]?.[0]?.transcript;
          const confidence = event?.results?.[i]?.[0]?.confidence;

          if (event?.results?.[i]?.isFinal) {
            finalTranscript += transcript;
            setConfidence(confidence);
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);

        if (finalTranscript) {
          processVoiceCommand(finalTranscript?.toLowerCase()?.trim());
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event?.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setTranscript('');
      };
    }

    return () => {
      if (recognitionRef?.current) {
        recognitionRef?.current?.stop();
      }
      if (audioContextRef?.current) {
        audioContextRef?.current?.close();
      }
    };
  }, []);

  const processVoiceCommand = (command) => {
    const matchedCommand = voiceCommands?.find(cmd => 
      command?.includes(cmd?.phrase) || cmd?.phrase?.includes(command)
    );

    if (matchedCommand) {
      setLastCommand(matchedCommand?.phrase);
      onVoiceCommand(matchedCommand?.action, command);
      
      // Provide audio feedback
      speakResponse(getResponseForCommand(matchedCommand?.action));
    } else {
      speakResponse("I didn't understand that command. Try saying 'show my progress' or 'what's my impact'.");
    }
  };

  const getResponseForCommand = (action) => {
    const responses = {
      showProgress: "Here\'s your weekly progress data.",
      showImpact: "Displaying your environmental impact summary.",
      showAchievements: "Here are your earned achievements.",
      setGoal: "Let\'s set up a new environmental goal.",
      startJournal: "Starting voice journal recording.",
      shareProgress: "Generating your impact card for sharing."
    };
    return responses?.[action] || "Command executed.";
  };

  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = async () => {
    if (!recognitionRef?.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    try {
      // Setup audio level monitoring
      const stream = await navigator.mediaDevices?.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef?.current?.createAnalyser();
      const source = audioContextRef?.current?.createMediaStreamSource(stream);
      source?.connect(analyserRef?.current);
      
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef?.current?.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateAudioLevel = () => {
        if (analyserRef?.current && isListening) {
          analyserRef?.current?.getByteFrequencyData(dataArray);
          const average = dataArray?.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average / 255);
          requestAnimationFrame(updateAudioLevel);
        }
      };

      recognitionRef?.current?.start();
      setIsListening(true);
      updateAudioLevel();
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  const stopListening = () => {
    if (recognitionRef?.current) {
      recognitionRef?.current?.stop();
    }
    setIsListening(false);
    setAudioLevel(0);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Voice Interface Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="relative"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isListening ? stopListening : startListening}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white organic-shadow organic-transition ${
            isListening 
              ? 'bg-conversion-accent animate-pulse' :'bg-primary hover:bg-primary/90'
          }`}
        >
          <Icon name={isListening ? "MicOff" : "Mic"} size={24} />
        </motion.button>

        {/* Audio Level Indicator */}
        {isListening && (
          <motion.div
            animate={{ 
              scale: 1 + audioLevel * 0.5,
              opacity: 0.6 + audioLevel * 0.4
            }}
            className="absolute inset-0 rounded-full border-4 border-conversion-accent pointer-events-none"
          />
        )}

        {/* Pulse Animation */}
        {isListening && (
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2 
            }}
            className="absolute inset-0 rounded-full bg-conversion-accent pointer-events-none"
          />
        )}
      </motion.div>
      {/* Voice Command Panel */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-organic organic-shadow p-4 border border-border"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">Voice Commands</h4>
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-2 h-2 bg-conversion-accent rounded-full"
                />
                <span className="text-xs text-muted-foreground">Listening...</span>
              </div>
            </div>

            {/* Current Transcript */}
            {transcript && (
              <div className="mb-3 p-2 bg-muted rounded-organic">
                <p className="text-sm text-foreground">"{transcript}"</p>
                {confidence > 0 && (
                  <div className="mt-1 flex items-center space-x-2">
                    <div className="flex-1 bg-white rounded-full h-1">
                      <div 
                        className="h-1 bg-success rounded-full transition-all duration-300"
                        style={{ width: `${confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(confidence * 100)}%
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Available Commands */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Try saying:
              </p>
              {voiceCommands?.map((command, index) => (
                <motion.div
                  key={command?.phrase}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-2 rounded-organic text-sm organic-transition cursor-pointer ${
                    lastCommand === command?.phrase
                      ? 'bg-primary text-white' :'bg-muted/50 hover:bg-muted text-foreground'
                  }`}
                  onClick={() => processVoiceCommand(command?.phrase)}
                >
                  <div className="font-medium">"{command?.phrase}"</div>
                  <div className="text-xs opacity-75">{command?.description}</div>
                </motion.div>
              ))}
            </div>

            {/* Audio Visualization */}
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-center space-x-1 h-8">
                {[...Array(20)]?.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      height: isListening 
                        ? Math.max(audioLevel * 30 + Math.random() * 10, 4)
                        : 4
                    }}
                    transition={{ duration: 0.1 }}
                    className="w-1 bg-primary rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceInterface;