import  { DefaultConfig }  from './default';
import  { ProductionConfig }  from './prod';

export class Config {
 public static configSet = (process.env.NODE_ENV !== 'production')?DefaultConfig:ProductionConfig;
}
