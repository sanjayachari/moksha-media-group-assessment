declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

import mongoose from 'mongoose';
declare global {
  var mongoose: { conn: mongoose.Connection | null, promise: Promise<mongoose.Connection> | null };
}

