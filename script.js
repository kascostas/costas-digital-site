document.getElementById('year').textContent = new Date().getFullYear();

const c = document.getElementById('particles');
const x = c.getContext('2d');
let w, h, pts;

function resize(){
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  pts = Array.from({length: 70}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*2 + 1,
    vx: (Math.random()-.5)*0.35,
    vy: (Math.random()-.5)*0.35
  }));
}

function frame(){
  x.clearRect(0,0,w,h);
  for(const p of pts){
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>w) p.vx*=-1;
    if(p.y<0||p.y>h) p.vy*=-1;
    x.beginPath();
    x.fillStyle = 'rgba(116,230,255,.8)';
    x.arc(p.x,p.y,p.r,0,Math.PI*2);
    x.fill();
  }
  for(let i=0;i<pts.length;i++){
    for(let j=i+1;j<pts.length;j++){
      const a=pts[i], b=pts[j];
      const d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<120){
        x.strokeStyle = `rgba(115,192,255,${(1-d/120)*0.18})`;
        x.lineWidth = 1;
        x.beginPath();
        x.moveTo(a.x,a.y);
        x.lineTo(b.x,b.y);
        x.stroke();
      }
    }
  }
  requestAnimationFrame(frame);
}

window.addEventListener('resize', resize);
resize();
frame();