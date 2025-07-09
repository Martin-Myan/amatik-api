import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MainService } from './main.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResSuccessDto } from '@responses/resSuccess.dto';
import {
  GetHoldersDto,
  GetHoldersResponseOutputDto,
  GlobalCryptoInfoDto,
} from '@dto/global/get-holder.dto';

@Controller('global')
@ApiTags('global')
export class MainController {
  constructor(private readonly globalService: MainService) {}

  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: { url: { type: 'string', example: 'https' } },
  //   },
  // })
  @Post('crypto-info')
  async cryptoInfo(@Body() requestBody: GlobalCryptoInfoDto): Promise<any> {
    const { url } = requestBody;
    return this.globalService.cryptoInfo(url);
  }

  @Get('holders')
  @ApiOperation({
    summary:
      'endpoint to use free version of holders api dynamic for each scan, (bscan or etherScan)',
    description:
      'You should always send string in the dropdown if you send another one the api cannot find the value in the cache, the keys are special',
  })
  @ApiOkResponse({ type: GetHoldersResponseOutputDto })
  async getBscanAmatikHolders(@Query() getHoldersDto: GetHoldersDto) {
    return new ResSuccessDto({
      data: {
        holdersCount: await this.globalService.getBSCanHolders(
          getHoldersDto.chainBase,
        ),
      },
    });
  }
}
