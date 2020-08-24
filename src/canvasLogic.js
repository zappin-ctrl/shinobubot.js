export const milk = (ctx, avatarAuthor, avatarUser) => {
    ctx.drawImage(avatarAuthor, 110, 35, 190, 190);
    ctx.drawImage(avatarUser, 420, 110, 90, 90);
};

export const bonk = (ctx, avatarAuthor, avatarUser, canvas) => {
    ctx.drawImage(avatarAuthor, 145, 90, 180, 180);
	
	ctx.translate(canvas.width/2, canvas.height/2);
	ctx.rotate(45*Math.PI/180);
    ctx.drawImage(avatarUser, 116, -136, 160, 160);
};

export const pin = (ctx, avatarAuthor, avatarUser) => {
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 20;
    ctx.drawImage(avatarAuthor, 235, 40, 150, 150);

    ctx.shadowColor = 'black';
    ctx.shadowBlur = 20;
    ctx.drawImage(avatarUser, 125, 365, 150, 150);
};

export const sauce = (ctx, avatarAuthor, avatarUser) => {
    ctx.globalAlpha = 0.7;
    ctx.drawImage(avatarUser, 190, 282, 260, 260);
};

export const tuck = (ctx, avatarAuthor, avatarUser, canvas) => {
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 25;
    ctx.drawImage(avatarAuthor, 70, 480, 265, 265);

    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(310*Math.PI/180);
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 25;
    ctx.drawImage(avatarUser, -180, -320, 360, 360);
};

export const marry = (ctx, avatarAuthor, avatarUser) => {
    ctx.drawImage(avatarAuthor, 400, 35, 150, 150);
    ctx.drawImage(avatarUser, 160, 35, 150, 150);
};