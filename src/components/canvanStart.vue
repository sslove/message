<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-30 14:58:36
 * @LastEditTime: 2019-08-08 21:00:03
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="star-sky">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class canvanStart extends Vue {
  @Prop({ type: Number, default: 30 }) public point!: Number;
  @Prop({ type: String, default: "rgba(0,0,0,0.5)" }) public lineColor!: String;
  @Prop({ type: String, default: "rgba(66,197,122)" })
  public roundColor!: String;
  //画布的属性
  public canWidth: Number = 0;
  public canHeight: Number = 0;
  public context: any = null;
  public circleArr: any[] = [];
  public timer: any = null;
  mounted() {
    const canvasDom = this.$refs.canvas as any;
    //获取画布的分辨率
    this.canWidth = canvasDom.offsetWidth;
    this.canHeight = window.outerHeight - 200;
    //设置画布的分辨率
    canvasDom.width = canvasDom.offsetWidth;
    canvasDom.height = window.outerHeight - 200;
    console.log(window.outerHeight - 200);
    //获取canvas上下文
    this.context = canvasDom.getContext("2d");
    //设置线条和星星颜色
    this.context.strokeStyle = this.lineColor;
    this.context.lineWidth = 1;
    this.context.fillStyle = this.roundColor;
    //初始化
    this.createCicleArr(); //设置星星数组
    this.draw(); //首屏绘制
    this.cycleDraw(); //循环绘制
  }
  //生成随机数
  public rangeRadom(max: any, min: any) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  //绘制原点
  public drawCicle(
    context: any,
    x: any,
    y: any,
    r: any,
    moveX?: any,
    moveY?: any
  ) {
    let circle = {
      x,
      y,
      r,
      moveX,
      moveY
    };
    context.beginPath();
    context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    return circle;
  }
  //绘制线条
  public drawLine(
    context: any,
    beginX: any,
    beginY: any,
    closeX: any,
    closeY: any,
    opacity: any
  ) {
    context.beginPath();
    context.strokeStyle = `rgba(0,0,0,${opacity}`;
    context.moveTo(beginX, beginY);
    context.lineTo(closeX, closeY);
    context.closePath();
    context.stroke();
  }
  //生成圆点
  createCicleArr() {
    for (let i = 0; i < this.point; i++) {
      this.circleArr.push(
        this.drawCicle(
          this.context,
          this.rangeRadom(this.canWidth, 0),
          this.rangeRadom(this.canHeight, 0),
          this.rangeRadom(15, 2),
          this.rangeRadom(10, -10) / 40,
          this.rangeRadom(10, -10) / 40
        )
      );
    }
  }
  //绘制
  draw() {
    const cicleArr = this.circleArr;
    this.context.clearRect(0, 0, this.canWidth, this.canHeight);
    for (let i = 0; i < this.point; i++) {
      this.drawCicle(this.context, cicleArr[i].x, cicleArr[i].y, cicleArr[i].r);
    }
    for (let i = 0; i < this.point; i++) {
      for (let j = 0; j < this.point; j++) {
        if (i + j < this.point) {
          let A = Math.abs(cicleArr[i + j].x - cicleArr[i].x);
          let B = Math.abs(cicleArr[i + j].y - cicleArr[i].y);
          let lineLength = Math.sqrt(A * A + B * B);
          let C = (1 / lineLength) * 7 - 0.009;
          let lineOpacity = C > 0.03 ? 0.03 : C;
          if (lineOpacity > 0) {
            this.drawLine(
              this.context,
              cicleArr[i].x,
              cicleArr[i].y,
              cicleArr[i + j].x,
              cicleArr[i + j].y,
              lineOpacity
            );
          }
        }
      }
    }
  }
  //循环绘制
  public cycleDraw() {
    this.timer = setInterval(() => {
      for (let i = 0; i < this.point; i++) {
        let cir = this.circleArr[i];
        cir.x += cir.moveX;
        cir.y += cir.moveY;
        if (cir.x > this.canWidth) {
          cir.x = 0;
        } else if (cir.x < 0) {
          cir.x = this.canWidth;
        }
        if (cir.y > this.canHeight) {
          cir.y = 0;
        } else if (cir.y < 0) {
          cir.y = this.canHeight;
        }
      }
      this.draw();
    }, 10);
  }
  public befreDestory() {
    clearInterval(this.timer);
  }
}
</script>
<style lang="less" scoped>
.star-sky {
  position: absolute;
  top: 100px;
  width: 100%;
  canvas {
    width: 100%;
  }
}
</style>
