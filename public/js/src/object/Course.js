import * as THREE from '../../libs/three.module.js';

/**
 * コースクラスです。
 */
export default class Course extends THREE.Object3D {
  /** 頂点情報 */
  get points() {
    return this._points;
  }

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    this._points = [];
    // ジオメトリ生成のための配列
    const floatArray = [];
    let radius = 5;
    for (let index = 0; index < 362; index++) {
      let rad = index * Math.PI / 180;

      let sin = Math.sin(rad * 3);

      let x = radius * Math.cos(rad) * 2 + sin * 2;
      let y = radius * Math.sin(rad) + sin * 3;
      this._points.push(new THREE.Vector3(x, y, 0));

      // ジオメトリ生成のために頂点を追加
      floatArray.push(x, y, 0);
    }

    const material = new THREE.LineBasicMaterial({
      color: 0xff0000,
    });

    // バッファージオメトリで、軌跡を作成
    // 参照: https://threejs.org/docs/#api/en/core/BufferGeometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(floatArray), 3)
    );

    const line = new THREE.Line(geometry, material);
    this.add(line);
  }
}
