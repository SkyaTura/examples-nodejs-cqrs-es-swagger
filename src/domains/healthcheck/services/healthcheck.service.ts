import { Injectable } from '@nestjs/common'

type OK = 'OK'

@Injectable()
export class HealthcheckService {
  constructor() {}

  ok(): OK {
    return 'OK'
  }
}
