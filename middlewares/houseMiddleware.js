import {
  ValidatorHelper,
  joiValidatorMsg,
  QueryHelper,
  msgs,
  serverResponse,
  localConstants,
} from '../helpers';
import { House, Image, Utility } from '../models';

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
  if (req.params.houseIdOrSlug) {
    const idOrSlug = req.params.houseIdOrSlug;
    const condition = isNaN(idOrSlug) ? { slug: idOrSlug } : { id: idOrSlug };

    const house = await houseDb.findOne(condition);
    if (house) {
      req.params.houseId = house.id;
      return next();
    }
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

  const imageLinks = houseImages.map((img) => img.link);
  const allImages = [...images, ...imageLinks];
  req.body.theImages = [];

  allImages.map((image) => {
    if (!imageLinks.includes(image)) {
      req.body.theImages.push({ link: image, houseId });
    }
  });
  // const  totalImages = allImages.length - localConstants.TOTAL_IMAGES;
  const remaingImages = allImages.length - localConstants.TOTAL_IMAGES;
  if (remaingImages > req.body.theImages.length) {
    const msg = `Too many images. Please delete ${remaingImages}`;
    return serverResponse(res, 400, msg);
  }
  return next();
};
export const areUtilitiesValid = async (req, res, next) => {
  const validator = new ValidatorHelper(req.body);
  const utilityDb = new QueryHelper(Utility);
  const { houseId } = req.params;
  const { utilities } = req.body;
  const errorBody = validator.validateInput('utilities', 'forHouse');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  req.body.houseUtilities = [];
  await Promise.all(
    utilities.map(async (util) => {
      const utility = await utilityDb.findOne({ id: util });
      if (utility) {
        req.body.houseUtilities.push({ houseId, utilityId: util });
      }
    })
  );
  if (!req.body.houseUtilities.length) {
    return serverResponse(res, 400, 'No utilities to save');
  }
  return next();
};
