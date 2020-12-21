declare module 'microphone-stream' {
  interface Data {
    sampleRate: number;
  };

  class MicrophoneStream {
    on(event: 'format' | 'data', callback: (data: Data) => void): void;
    stop(): void;
    setStream(stream: any): void;
    static toRaw(chunk: Buffer): Float32Array;
  }

  export = MicrophoneStream;
}