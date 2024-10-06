import { Controller, Get, Query } from '@nestjs/common';

@Controller('carts')
export class CartsController {
  getProfile() {
    return {
      message: 'User Profile',
    };
  }
}
