"use client";

export const VaporwaveBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-vapor-dark">
      {/* Sun */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-b from-vapor-pink via-vapor-purple to-transparent opacity-50 blur-3xl" />
      
      {/* Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #01cdfe 1px, transparent 1px),
            linear-gradient(to bottom, #01cdfe 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center bottom',
        }}
      />
      
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};
