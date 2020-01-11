export function dim(canvas, pixel, radius) {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const width = parseInt(canvas.width / pixel), height = parseInt(canvas.height / pixel);
  const data = imageData.data;
  const map = [], dp = [];
  const getMapValue = (x, y) => {
    return map[y] && map[y][x] || [0, 0, 0, 0];
  }
  const getIndex = (x, y) => {
    return x * pixel * 4 + y * pixel * canvas.width * 4;
  }
  for (let y = - radius - 1; y < height; y++) {
    const ry = y + radius + 1;
    map.push([]);
    dp.push([]);
    for (let x = - radius - 1; x < width; x++) {
      const rx = x + radius + 1;
      dp[ry][rx] = [0, 0, 0, 0];
      if (x < 0 || x >= width || y < 0 || y >= height) {
        map[ry][rx] = [0, 0, 0, 0];
      } else {
        const index = getIndex(x, y);
        map[ry][rx] = [data[index], data[index + 1], data[index + 2], data[index + 3]];
      }
    }
  }

  for (let y = - radius; y < height; y++) {
    const ry = y + radius + 1;
    for (let x = - radius; x < width; x++) {
      const rx = x + radius + 1;
      const value = [0, 0, 0, 0];
      for (let v of [
        dp[ry - 1][rx],
        dp[ry][rx - 1],
        getMapValue(rx - radius - 1, ry - radius - 1),
        getMapValue(rx + radius, ry + radius)
      ]) {
        for (let i = 0; i < 4; i++) {
          value[i] += v[i]
        }
      }
      for (let v of [
        dp[ry - 1][rx - 1],
        getMapValue(rx + radius, ry - radius - 1),
        getMapValue(rx - radius - 1, ry + radius)
      ]) {
        for (let i = 0; i < 4; i++) {
          value[i] -= v[i]
        }
      }

      dp[ry][rx] = value;
      if (x < 0 || x >= width || y < 0 || y >= height) {
        continue;
      }
      const index = getIndex(x, y);
      const total = (Math.min(width - 1, x + radius) - Math.max(0, x - radius) + 1)
        * (Math.min(height - 1, y + radius) - Math.max(0, y - radius) + 1);
      const px = parseInt((index % (canvas.width * 4)) / 4);
      const py = parseInt(index / (canvas.width * 4));
      for (let i = 0; i < pixel && py + i < canvas.height; i++) {
        for (let j = 0; j < pixel && px + j < canvas.width; j++) {
          let p = (py + i) * canvas.width * 4 + (px + j) * 4;
          for (let k = 0; k < 4; k++) {
            data[p + k] = parseInt(dp[ry][rx][k] / total);
          }
        }
      }

    }
  }
  ctx.putImageData(imageData, 0, 0);
}


export default {
  dim
}