import { Injectable, OnModuleInit, OnModuleDestroy, InternalServerErrorException } from '@nestjs/common';
import { ConcreteGarden } from './garden-helper';
import { GardenBusinessErrors } from './error/GardenBusinessError';
import { User } from 'src/user/models/user.model';

// Singleton Pattern for Garden Manager
@Injectable()
export class GardenManagerService implements OnModuleInit {
  public static gardenList = {};
  private static backUpFile = './gardenManangerBackup';
  private static count = 0;
  onModuleInit() {
    return;
  }
  static addGarden(garden: ConcreteGarden) {
    this.gardenList[this.count] = garden;
    this.count++;
  }
  static getCurrentNumber() {
    return this.count;
  }
  static removeGarden(id: number) {
    delete this.gardenList[id];
  }
  static getGarden(id: number) {
    return this.gardenList[id];
  }
  static findGarden(name: string, owner: User) { 
    for (const key in this.gardenList) {
        if(this.gardenList[key].gardenName == name && JSON.stringify(this.gardenList[key].Owner) === JSON.stringify(owner)) {  
          return {
              gardenId: this.gardenList[key].gardenId
            }
        }
    }
    throw new InternalServerErrorException(GardenBusinessErrors.NotFound)
  }
}

@Injectable()
class GardenManagerBackup implements OnModuleDestroy {
  onModuleDestroy() {
    // Backup GardenManagerService
    return;
  }
}
