export class RigidBody {
    constructor(mesh, collider) {
        this.mesh = mesh;
        this.collider = collider;
    }

    setCollider(collider) {
        this.collider = collider;
        return this;
    }

    setMesh(mesh) {
        this.mesh = mesh;
        return this;
    }

    update() {
        this.mesh.position.copy(this.collider.position);
    }
}

export default RigidBody;
