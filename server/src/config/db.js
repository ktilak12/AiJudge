import mongoose from 'mongoose';

let memoryServer = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  try {
    if (uri && uri.trim() !== '') {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`[Database] Connected successfully to MongoDB: ${mongoose.connection.host}`);
      return;
    }

    console.warn('[Database] MONGODB_URI not specified. Launching in-memory MongoDB for seamless development...');
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    const memoryUri = memoryServer.getUri();
    
    await mongoose.connect(memoryUri);
    console.log(`[Database] Connected to in-memory MongoDB at ${memoryUri}`);
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    // If external URI failed in dev mode, attempt in-memory fallback
    if (process.env.NODE_ENV !== 'production' && !memoryServer) {
      try {
        console.warn('[Database] Attempting fallback to in-memory MongoDB...');
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        memoryServer = await MongoMemoryServer.create();
        const fallbackUri = memoryServer.getUri();
        await mongoose.connect(fallbackUri);
        console.log(`[Database] Fallback connected to in-memory MongoDB at ${fallbackUri}`);
        return;
      } catch (memError) {
        console.error(`[Database Error] In-memory fallback failed: ${memError.message}`);
      }
    }
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
  }
};

