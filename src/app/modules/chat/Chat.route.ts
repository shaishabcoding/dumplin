import { Router } from 'express';
import { ChatControllers } from './Chat.controller';
import purifyRequest from '../../middlewares/purifyRequest';
import { ChatValidations } from './Chat.validation';
import { MessageControllers } from '../message/Message.controller';
import { QueryValidations } from '../query/Query.validation';
import Chat from './Chat.model';
import { MessageValidations } from '../message/Message.validation';

const router = Router();

router.get('/', purifyRequest(QueryValidations.list), ChatControllers.list);

router.post('/create-session', ChatControllers.create);

router.patch(
  '/:chatId/rename',
  purifyRequest(
    QueryValidations.exists('chatId', Chat),
    ChatValidations.rename,
  ),
  ChatControllers.rename,
);

router.delete(
  '/:chatId/delete',
  purifyRequest(QueryValidations.exists('chatId', Chat)),
  ChatControllers.delete,
);

router.delete('/clear', ChatControllers.clear);

router.get(
  '/:chatId',
  purifyRequest(QueryValidations.exists('chatId', Chat), QueryValidations.list),
  MessageControllers.list,
);

router.post(
  '/:chatId/ask',
  purifyRequest(
    QueryValidations.exists('chatId', Chat),
    MessageValidations.chat,
  ),
  MessageControllers.ask,
);

export const ChatRoutes = router;
