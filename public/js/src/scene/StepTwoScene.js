import * as THREE from '../../libs/three.module.js';
import Camera from '../camera/Camera.js';
import Course from '../object/Course.js';
import Truck from '../object/Truck.js';

/**
 * ステップ２シーンクラスです。
 */
export default class StepTwoScene extends THREE.Scene {
  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    this._frame = 0;

    // カメラ
    this.camera = new Camera();
    this.camera.position.y = 10;
    this.camera.position.x = 10;
    this.camera.position.z = 30;

    // 環境光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.add(ambientLight);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.add(directionalLight);

    // 床
    const gridHelper = new THREE.GridHelper(50, 30);
    gridHelper.position.y = -10;
    this.add(gridHelper);

    // コース
    this._course = new Course();
    this.add(this._course);

    // トロッコ
    this._truck = new Truck();
    this._truck.scale.multiplyScalar(0.5);
    this._truck.position.copy(this._course.points[0]);
    this.add(this._truck);

    // 1周（6秒）を判定するための変数
    this.multipleOf6 = 0;
  }

  /**
   * 更新します。
   */

  update(startTime) {
    this.camera.update();

    // 現在時間の継続時間に対する進捗度を算出
    const progress = (Date.now() - startTime) / 1000;

    // 1周（6秒）を判定
    if (Math.floor(progress) % 6 === 0) {
      this.multipleOf6 = Math.floor(progress) / 6;
    }
    // コースを360分割した点のうち、1秒あたり60点分移動
    this._frame = Math.round(60 * (progress - 6 * this.multipleOf6));

    // コースの法線を取得
    const normal = this._getNormal(
      this._course.points[this._frame],
      this._course.points[this._frame + 1]
    );

    // トラックの位置を修正
    this._truck.position.copy(this._course.points[this._frame]);
    this._truck.up.set(normal.x, normal.y, normal.z);
    this._truck.lookAt(this._course.points[this._frame + 1]);
  }

  /**
   * ポイントから法線を算出します。
   */
  _getNormal(currentPoint, nextPoint) {
    const frontVec = currentPoint
      .clone()
      .sub(nextPoint)
      .normalize();
    const sideVec = new THREE.Vector3(0, 0, -1);
    const normalVec = frontVec.cross(sideVec);

    return normalVec;
  }
}
