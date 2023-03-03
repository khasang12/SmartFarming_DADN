/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';

interface Subject {
  subcribe(observer: Observer): void;
  unsubcribe(observer: Observer): void;
  notify(news: string): void;
}

interface IObserver {
  update(news: string): void;
}

class Garden implements Subject {
  private observers: Observer[];
  subcribe(observer: Observer): void {
    this.observers.push(observer);
  }
  unsubcribe(observer: Observer): void {
    this.observers = this.observers.filter((ele) => ele.id === observer.id);
  }
  notify(news: string): void {
    this.observers.forEach((observer) => observer.update(news));
  }
}

class Observer implements IObserver {
  private feed: string[];
  constructor(public id: number, public name: string) {};
  update(news: string): void {
    this.feed.push(news);
    console.log('New Feeds');
  }
}

@Injectable()
export class GardenService {}
