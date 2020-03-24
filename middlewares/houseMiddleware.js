import {
  ValidatorHelper,
  joiValidatorMsg,
  QueryHelper,
  msgs,
  serverResponse,
  localConstants
} from '../helpers';
import { House, Image } from '../models';

export const isHouseValid = (req, res, next) => {
  req.body.userId = req.user.a_level === 2 ? req.user.id : req.body.userId;
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('house', 'new');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  req.body.type = 'house';
  req.body.status = 'Pending';
  return next();
};
export const isHouseUpdateValid = (req, res, next) => {
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('house', 'genUpdate');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};
export const doesHouseExist = async (req, res, next) => {
  let houseDb = new QueryHelper(House);
  if (req.params.houseId) {
    const { houseId: id } = req.params;
    const house = await houseDb.findOne({ id });
    if (house) return next();
  }
  return serverResponse(res, 404, msgs.NOT_FOUND('House'));
};
export const areImagesValid = async (req, res, next) => {
  const validator = new ValidatorHelper(req.body);
  const imageDb = new QueryHelper(Image);
  const { houseId } = req.params;
  const errorBody = validator.validateInput('images');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  const { images } = req.body;
  const houseImages = await imageDb.findAll({ houseId }, null, ['link']);
  houseImages.map(img => img.link);
  const allImages = [images, ...houseImages];
  req.body.theImages = [];
  allImages.map(image => {
    if (!houseImages.includes(image)) {
      req.body.theImages.push({ link: image, houseId });
    }
  });
  // const  totalImages = allImages.length - localConstants.TOTAL_IMAGES;
  const remaingImages =
    images.length + houseImages.length - localConstants.TOTAL_IMAGES;
  if (remaingImages > 0) {
    const msg = `Too many images. Please delete ${remaingImages}`;
    return serverResponse(res, 400, msg);
  }
  return next();
};
