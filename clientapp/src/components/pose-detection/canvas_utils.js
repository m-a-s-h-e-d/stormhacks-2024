export function drawSegment(ctx, [mx, my], [tx, ty], color) {
  ctx.beginPath();
  ctx.moveTo(mx, my);
  ctx.lineTo(tx, ty);
  ctx.lineWidth = 5;
  ctx.strokeStyle = color;
  ctx.stroke();
}

export function drawPoint(ctx, x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

export function scaleKeypoint(keypoint, video) {
  const widthRatio = video.width / video.videoWidth;
  const heightRatio = video.height / video.videoHeight;
  keypoint.x = keypoint.x * widthRatio;
  keypoint.y = keypoint.y * heightRatio;
  return keypoint;
}
