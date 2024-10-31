import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './db';

interface SystemCardDataAttributes {
  id: number;
  title: string;
  image: string;
  description: string;
  status: boolean;
  weblink: string;
}

interface SystemCardDataCreationAttributes extends Optional<SystemCardDataAttributes, 'id'> {}

class SystemCardData extends Model<SystemCardDataAttributes, SystemCardDataCreationAttributes> 
  implements SystemCardDataAttributes {
  public id!: number;
  public title!: string;
  public image!: string;
  public description!: string;
  public status!: boolean;
  public weblink!: string;
}

SystemCardData.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.BOOLEAN, allowNull: false },
    weblink: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: 'system_card_data',
  }
);

export default SystemCardData;
