class Pacman {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = 4;
        this.nextDirection = 4;
        this.currentFrame = 1;
        this.frameCount = 7;

        setInterval(() => {
            this.chanfeAnimation();
        }, 100);
    }

    moveProcess() {
        this.chanfeDirectionIfPossible();
        this.moveForwards();
        if (this.checkCollisions()) {
            // 벽에 닿았을때 더 안들어가게 막아준다
            this.moveBackwards();
            return;
        }
    }

    // 먹이 생성
    eat() {
        for(let i = 0; i < map.length; i++){
            for(let j = 0; j < map[0].length; j++){
                // 맵에 있는 번호 (0 : 공백, 1 : 벽, 2 : 길)
                if(map[i][j] == 2 &&
                    this.getMapX() == j &&
                    this.getMapY() == i
                    ){
                        map[i][j] = 3;
                        score++;
                    }
            }
        }
    }

    moveBackwards() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x -= this.speed;
                break;
            case DIRECTION_UP:
                this.y += this.speed
                break;
            case DIRECTION_LEFT:
                this.x += this.speed
                break;
            case DIRECTION_BOTTOM:
                this.y -= this.speed
                break;
        }
    }

    moveForwards() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x += this.speed;
                break;
            case DIRECTION_UP:
                this.y -= this.speed
                break;
            case DIRECTION_LEFT:
                this.x -= this.speed
                break;
            case DIRECTION_BOTTOM:
                this.y += this.speed
                break;
        }
    }

    checkCollisions() {
        let isCollided = false;
        if (map[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize)] == 1
            || map[parseInt(this.y / oneBlockSize + 0.9999)][parseInt(this.x / oneBlockSize)] == 1
            || map[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize + 0.9999)] == 1
            || map[parseInt(this.y / oneBlockSize + 0.9999)][parseInt(this.x / oneBlockSize + 0.9999)] == 1)
            {
            isCollided = true;
        }
        return isCollided;
    }

    checkGhostCollision() {
        for(let i = 0; i < ghosts.length; i++){
            let ghost = ghosts[i]
            if(ghost.getMapX() == this.getMapX() && ghost.getMapY == this.getMapY){
                return true;
            }
        }
        return false;
    }

    chanfeDirectionIfPossible() {
        if(this.direction == this.nextDirection) return
        let tempDirection = this.directionthis;
        this.direction = this.nextDirection;
        this.moveForwards();
        if(this.checkCollisions()){
            this.moveBackwards();
            this.direction = tempDirection; 
        } else {
            this.moveBackwards();
        }
    }


    getMapX() {
        return parseInt(this.x / oneBlockSize)
    }

    getMapY() {
        return parseInt(this.y / oneBlockSize)
    }

    getMapXRightSide() {
        return parseInt((this.x + 0.9999 * oneBlockSize) / oneBlockSize)
    }

    getMapYRightSide() {
        return parseInt((this.y + 0.9999 * oneBlockSize) / oneBlockSize)
    }

    chanfeAnimation() {
        this.currentFrame = 
             this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    }

    draw() {
        canvasContext.save();
        canvasContext.translate(
            this.x + oneBlockSize / 2,
            this.y + oneBlockSize / 2
        );
        canvasContext.rotate((this.direction * 90 * Math.PI) / 180);

        canvasContext.translate(
            -this.x - oneBlockSize / 2,
            -this.y - oneBlockSize / 2
        );

        canvasContext.drawImage(
            pacmanFrames,
            (this.currentFrame - 1) * oneBlockSize,
            0, 
            oneBlockSize, 
            oneBlockSize, 
            this.x, 
            this.y, 
            this.width, 
            this.height
        );

        canvasContext.restore();
    }
}