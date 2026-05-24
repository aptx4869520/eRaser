const c = paint, x = c.getContext("2d"), R = 60;
let d = 0, px = 0, py = 0;

const fit = _ => {
  const p = devicePixelRatio || 1;
  c.width = innerWidth * p;
  c.height = innerHeight * p;
  x.setTransform(p, 0, 0, p, 0, 0);
  x.globalCompositeOperation = "source-over";
  x.fillStyle = "#fff";
  x.fillRect(0, 0, innerWidth, innerHeight); // blanc de base
  x.lineCap = x.lineJoin = "round"; //控制筆刷形狀
  x.lineWidth = R * 2; // 控制筆刷粗細（與半徑成比例）
};

fit();
addEventListener("resize", fit);

const erase = e => {
  if (!d) return;
  x.globalCompositeOperation = "destination-out";
  x.beginPath();
  x.moveTo(px, py);
  x.lineTo(e.clientX, e.clientY);
  x.stroke();
  px = e.clientX;
  py = e.clientY;
};

c.onpointerdown = e => (d = 1, px = e.clientX, py = e.clientY, erase(e));
c.onpointermove = erase;
onpointerup = _ => d = 0;