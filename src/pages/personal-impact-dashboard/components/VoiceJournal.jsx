import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const VoiceJournal = ({ entries, onAddEntry }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showTranscription, setShowTranscription] = useState(false);
  const [currentTranscription, setCurrentTranscription] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef?.current) {
        clearInterval(intervalRef?.current);
      }
      if (audioContextRef?.current) {
        audioContextRef?.current?.close();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ audio: true });
      
      // Setup audio context for visualization
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef?.current?.createAnalyser();
      const source = audioContextRef?.current?.createMediaStreamSource(stream);
      source?.connect(analyserRef?.current);
      
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef?.current?.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      // Setup media recorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks?.push(event?.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Mock transcription (in real app, would use speech-to-text API)
        const mockTranscriptions = [
          "Today I made a conscious effort to reduce my carbon footprint by cycling to work instead of driving. It felt great to contribute to a cleaner environment while also getting some exercise.",
          "I\'ve been reflecting on my sustainability journey this week. Small changes like using a reusable water bottle and shopping with cloth bags are becoming second nature.",
          "The community challenge really motivated me to be more mindful about energy consumption. I\'ve started unplugging devices when not in use and it\'s already showing results.",
          "I\'m proud of reaching my waste reduction goal this month. Composting has become a rewarding habit that connects me more with nature\'s cycles."
        ];
        
        const transcription = mockTranscriptions?.[Math.floor(Math.random() * mockTranscriptions?.length)];
        setCurrentTranscription(transcription);
        
        onAddEntry({
          id: Date.now(),
          date: new Date()?.toISOString(),
          audioUrl,
          transcription,
          duration: recordingTime,
          waveform: generateMockWaveform()
        });
        
        setShowTranscription(true);
        stream?.getTracks()?.forEach(track => track?.stop());
      };

      mediaRecorderRef?.current?.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      // Start audio level monitoring
      const updateAudioLevel = () => {
        if (analyserRef?.current) {
          analyserRef?.current?.getByteFrequencyData(dataArray);
          const average = dataArray?.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average / 255);
          
          if (isRecording) {
            requestAnimationFrame(updateAudioLevel);
          }
        }
      };
      updateAudioLevel();

    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef?.current && isRecording) {
      mediaRecorderRef?.current?.stop();
      setIsRecording(false);
      clearInterval(intervalRef?.current);
      setAudioLevel(0);
    }
  };

  const generateMockWaveform = () => {
    return Array.from({ length: 50 }, () => Math.random() * 100);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const WaveformVisualization = ({ waveform, isActive = false }) => (
    <div className="flex items-center justify-center space-x-1 h-12">
      {waveform?.map((height, index) => (
        <motion.div
          key={index}
          initial={{ height: 2 }}
          animate={{ 
            height: isActive ? Math.max(height * 0.4, 2) : height * 0.4,
            backgroundColor: isActive ? '#7CB342' : '#E0E0E0'
          }}
          transition={{ duration: 0.1 }}
          className="w-1 bg-muted rounded-full"
          style={{ height: `${height * 0.4}px` }}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Voice Journal</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Mic" size={16} />
          <span>{entries?.length} recordings</span>
        </div>
      </div>
      {/* Recording Interface */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-organic p-6 text-center">
        <div className="mb-4">
          <motion.div
            animate={{ 
              scale: isRecording ? [1, 1.1, 1] : 1,
              backgroundColor: isRecording ? '#7CB342' : '#2D5A27'
            }}
            transition={{ 
              scale: { repeat: isRecording ? Infinity : 0, duration: 1 },
              backgroundColor: { duration: 0.3 }
            }}
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white cursor-pointer"
            onClick={isRecording ? stopRecording : startRecording}
          >
            <Icon name={isRecording ? "Square" : "Mic"} size={32} />
          </motion.div>
        </div>

        {isRecording && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <div className="text-lg font-semibold text-primary">
              {formatTime(recordingTime)}
            </div>
            
            {/* Audio level visualization */}
            <div className="flex justify-center">
              <motion.div
                animate={{ 
                  width: `${Math.max(audioLevel * 200, 20)}px`,
                  backgroundColor: audioLevel > 0.5 ? '#7CB342' : '#29B6F6'
                }}
                className="h-2 bg-primary rounded-full transition-all duration-100"
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              Share your sustainability journey...
            </p>
          </motion.div>
        )}

        {!isRecording && (
          <div>
            <p className="text-muted-foreground mb-4">
              Record your thoughts and reflections on your environmental journey
            </p>
            <Button
              variant="default"
              iconName="Mic"
              iconPosition="left"
              onClick={startRecording}
            >
              Start Recording
            </Button>
          </div>
        )}
      </div>
      {/* Transcription Modal */}
      <AnimatePresence>
        {showTranscription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-organic p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-foreground">Recording Saved</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setShowTranscription(false)}
                />
              </div>
              
              <div className="space-y-4">
                <div className="bg-muted rounded-organic p-3">
                  <p className="text-sm text-foreground">{currentTranscription}</p>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTranscription(false)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Share"
                    iconPosition="left"
                  >
                    Share
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Journal Entries */}
      <div className="space-y-4">
        {entries?.map((entry, index) => (
          <motion.div
            key={entry?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-organic p-4 organic-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  {new Date(entry.date)?.toLocaleDateString()} • {formatTime(entry?.duration)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Play"
              >
                Play
              </Button>
            </div>
            
            <WaveformVisualization waveform={entry?.waveform} />
            
            {entry?.transcription && (
              <div className="mt-3 p-3 bg-muted rounded-organic">
                <p className="text-sm text-foreground">{entry?.transcription}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      {entries?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Mic" size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">No recordings yet</p>
          <p className="text-sm">Start your first voice journal entry to track your sustainability journey</p>
        </div>
      )}
    </div>
  );
};

export default VoiceJournal;