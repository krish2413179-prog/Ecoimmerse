import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const VoiceInteraction = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [voiceCommands, setVoiceCommands] = useState([]);
  const [showCommands, setShowCommands] = useState(false);
  const recognitionRef = useRef(null);

  const availableCommands = [
    {
      command: ['hello', 'hi', 'hey'],
      response: 'Welcome to Ecoimmerse! How can I help you start your sustainability journey?',
      action: 'greet',
      icon: 'Hand',
    },
    {
      command: 'start journey',
      response: 'Great! Let me guide you to your personal impact dashboard.',
      action: 'navigate',
      route: '/personal-impact-dashboard',
      icon: 'Compass',
    },
    {
      command: 'show challenges',
      response: 'Here are some exciting sustainability challenges for you!',
      action: 'navigate',
      route: '/challenges',
      icon: 'Target',
    },
    {
      command: 'community',
      response: 'Connecting you with our amazing eco-warrior community!',
      action: 'navigate',
      route: '/community',
      icon: 'Users',
    },
    {
      command: ['help', 'what can you do', 'what can i do'],
      response: 'I can help you navigate Ecoimmerse. Try saying "start journey" or "show challenges".',
      action: 'help',
      icon: 'HelpCircle',
    },
    {
      command: 'impact',
      response: 'Let me show you the amazing impact our community is making!',
      action: 'scroll',
      target: 'impact-section',
      icon: 'BarChart3',
    },
  ];

  useEffect(() => {
    // Check for Web Speech API support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

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
      };
    }

    return () => {
      if (recognitionRef?.current) {
        recognitionRef?.current?.stop();
      }
    };
  }, []);

  const processVoiceCommand = (command) => {
    const matchedCommand = availableCommands?.find(cmd => 
      command?.includes(cmd?.command?.toLowerCase())
    );

    if (matchedCommand) {
      const commandExecution = {
        id: Date.now(),
        command: matchedCommand?.command,
        response: matchedCommand?.response,
        timestamp: new Date(),
        confidence: confidence,
      };

      setVoiceCommands(prev => [commandExecution, ...prev?.slice(0, 4)]);

      // Execute the command action
      setTimeout(() => {
        executeCommand(matchedCommand);
      }, 1500);
    } else {
      const fallbackResponse = {
        id: Date.now(),
        command: command,
        response: `I didn't understand "${command}". Try saying "help" to see available commands.`,
        timestamp: new Date(),
        confidence: confidence,
      };
      setVoiceCommands(prev => [fallbackResponse, ...prev?.slice(0, 4)]);
    }
  };

  const executeCommand = (command) => {
    switch (command?.action) {
      case 'navigate':
        if (command?.route) {
          window.location.href = command?.route;
        }
        break;
      case 'scroll':
        if (command?.target) {
          const element = document.getElementById(command?.target);
          if (element) {
            element?.scrollIntoView({ behavior: 'smooth' });
          }
        }
        break;
      case 'welcome': case'help':
      default:
        // Just show the response
        break;
    }
  };

  const startListening = () => {
    if (recognitionRef?.current && isSupported) {
      recognitionRef?.current?.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef?.current) {
      recognitionRef?.current?.stop();
    }
  };

  const VoiceVisualizer = () => (
    <div className="flex items-center justify-center space-x-1">
      {[1, 2, 3, 4, 5]?.map((i) => (
        <motion.div
          key={i}
          className="w-1 bg-secondary rounded-full"
          animate={isListening ? {
            height: [8, 24, 8],
            opacity: [0.5, 1, 0.5],
          } : { height: 8, opacity: 0.5 }}
          transition={{
            duration: 0.8,
            repeat: isListening ? Infinity : 0,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );

  const CommandHistory = () => (
    <AnimatePresence>
      {voiceCommands?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-6 space-y-3"
        >
          {voiceCommands?.map((cmd) => (
            <motion.div
              key={cmd?.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card/80 backdrop-blur-sm rounded-lg p-4 organic-shadow"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="MessageCircle" size={16} className="text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-foreground">
                      "{cmd?.command}"
                    </span>
                    <span className="text-xs text-text-secondary">
                      {Math.round(cmd?.confidence * 100)}% confidence
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">{cmd?.response}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const CommandSuggestions = () => (
    <AnimatePresence>
      {showCommands && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 bg-card/90 backdrop-blur-sm rounded-lg p-6 organic-shadow"
        >
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Mic" size={20} className="text-secondary" />
            <span>Try These Voice Commands</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableCommands?.map((cmd, index) => (
              <motion.div
                key={cmd?.command}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 organic-transition cursor-pointer"
                onClick={() => processVoiceCommand(cmd?.command)}
              >
                <Icon name={cmd?.icon} size={16} className="text-primary" />
                <div>
                  <span className="text-sm font-medium text-foreground">
                    "{cmd?.command}"
                  </span>
                  <p className="text-xs text-text-secondary mt-1">
                    {cmd?.response?.substring(0, 50)}...
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!isSupported) {
    return (
      <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 organic-shadow">
        <div className="flex items-center space-x-3 text-text-secondary">
          <Icon name="MicOff" size={24} />
          <div>
            <p className="font-medium">Voice commands not supported</p>
            <p className="text-sm">Your browser doesn't support speech recognition</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 organic-shadow">
      {/* Voice Control Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.div
            animate={isListening ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isListening ? 'bg-secondary/20' : 'bg-primary/20'
            }`}
          >
            <Icon 
              name={isListening ? "MicIcon" : "Mic"} 
              size={20} 
              className={isListening ? "text-secondary" : "text-primary"} 
            />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Voice Assistant</h3>
            <p className="text-sm text-text-secondary">
              {isListening ? 'Listening...' : 'Click to activate voice commands'}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          iconName={showCommands ? "ChevronUp" : "ChevronDown"}
          onClick={() => setShowCommands(!showCommands)}
        >
          Commands
        </Button>
      </div>
      {/* Voice Visualizer */}
      {isListening && (
        <div className="mb-6">
          <VoiceVisualizer />
          {transcript && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 p-3 bg-muted/50 rounded-lg"
            >
              <p className="text-sm text-foreground">"{transcript}"</p>
            </motion.div>
          )}
        </div>
      )}
      {/* Control Buttons */}
      <div className="flex items-center space-x-4 mb-6">
        <Button
          variant={isListening ? "destructive" : "default"}
          iconName={isListening ? "Square" : "Mic"}
          iconPosition="left"
          onClick={isListening ? stopListening : startListening}
          className="organic-transition"
        >
          {isListening ? 'Stop Listening' : 'Start Voice Command'}
        </Button>

        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-secondary animate-pulse' : 'bg-muted'}`} />
          <span>{isListening ? 'Active' : 'Ready'}</span>
        </div>
      </div>
      {/* Command Suggestions */}
      <CommandSuggestions />
      {/* Command History */}
      <CommandHistory />
    </div>
  );
};

export default VoiceInteraction;