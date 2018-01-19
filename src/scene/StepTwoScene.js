import * as THREE from 'three';
import Camera from '../camera/Camera';
import Course from '../object/Course';
import Truck from '../object/Truck';

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
  }

  /**
   * 更新します。
   */
  update() {
    this.camera.update();
    this._frame++;
    if (this._frame > 360) {
      this._frame = 0;
    }

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
  _getNormal(curentPoint, nextPoint) {
    const frontVec = curentPoint.clone().sub(nextPoint).normalize();
    const sideVec = new THREE.Vector3(0, 0, -1);
    const normalVec = frontVec.cross(sideVec);

    return normalVec;
  }
}