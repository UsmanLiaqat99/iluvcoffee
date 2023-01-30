import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Coffee } from "./entities/coffee.entity";
import { CreateCoffeeDto } from "./dto/create-coffee.dto/create-coffee.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CoffeesService {

  constructor(@InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>) {
  }

  findAll() {
    return this.coffeeModel.find().exec();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeModel.findOne({_id: id}).exec();
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    const coffee = new this.coffeeModel(createCoffeeDto);
    return coffee.save();
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      //Update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
    if (coffeeIndex >= 0) {
      return this.coffees.splice(coffeeIndex, 1);
    }
  }
}