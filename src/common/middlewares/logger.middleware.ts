import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/ban-types
  use(req: any, res: Response, next: Function) {
    try {
      const offuscateRequest = JSON.parse(JSON.stringify(req.body));
      if (offuscateRequest && offuscateRequest.password)
        offuscateRequest.password = '*******';
      if (offuscateRequest && offuscateRequest.newPassword)
        offuscateRequest.newPassword = '*******';
      if (offuscateRequest && offuscateRequest.passwordConfirm)
        offuscateRequest.passwordConfirm = '*******';
      if (offuscateRequest && offuscateRequest.currentPassword)
        offuscateRequest.currentPassword = '*******';

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (offuscateRequest != {})
        console.log(
          new Date().toString() +
            ' - [Request] ' +
            req.baseUrl +
            ' - ' +
            JSON.stringify(offuscateRequest),
        );
    } catch (error) {}
    next();
  }
}
