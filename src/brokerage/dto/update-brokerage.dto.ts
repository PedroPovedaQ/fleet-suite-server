import { PartialType } from '@nestjs/mapped-types';
import { CreateBrokerageDto } from './create-brokerage.dto';

export class UpdateBrokerageDto extends PartialType(CreateBrokerageDto) {}
