import * as TypeOrm from 'typeorm';
import * as moment from 'moment';

export default abstract class BaseEntity extends TypeOrm.BaseEntity {
    @TypeOrm.Column({ name: 'created_at' })
    public createdAt: Date;

    @TypeOrm.Column({ name: 'updated_at', nullable: true })
    public updatedAt: Date;

    @TypeOrm.BeforeInsert()
    protected setCreatedAt() {
        this.createdAt = this.formatDate();
    }

    @TypeOrm.BeforeUpdate()
    protected setUpdatedAt() {
        this.updatedAt = this.formatDate();
    }

    private formatDate() {
        return new Date(
            moment.unix(moment().unix()).format('YYYY-MM-DD HH:mm:ss')
        );
    }
}
