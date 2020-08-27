import Canvas from "canvas";
import axios from "axios";

export const magik = async (ctx, image, canvas, imageSrc) => {
    let response = await axios.get(`https://api.alexflipnote.dev/filter/magik?image=${imageSrc}`, {
        responseType: "arraybuffer"
    });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');

    ctx.drawImage(await Canvas.loadImage('data:' + response.headers['content-type'] + ';base64,' + base64), 0, 0, canvas.width, canvas.height)
};