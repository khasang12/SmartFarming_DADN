import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ConcreteGarden } from "./gardenHelper.service";

// Singleton Pattern for Garden Manager
@Injectable()
export class GardenManagerService implements OnModuleInit {
    public static gardenList = {};
    private static backUpFile = "./gardenManangerBackup";
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
    static removeGarden(id : number) {
        delete this.gardenList[id];
    }
    static getGarden(id : number) {
        return this.gardenList[id];
    }
}

@Injectable()
class GardenManagerBackup implements OnModuleDestroy {
    onModuleDestroy() {
        // Backup GardenManagerService
        return;
    }
}