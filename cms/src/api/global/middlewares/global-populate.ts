import type { Core } from '@strapi/strapi';

const globalPopulate: Core.MiddlewareHandler = async (ctx, next) => {
  ctx.query.populate = {
    Icon: true,
    Logo: true,
    Announcement: {
      populate: {
        RichText: true,
      },
    },
    Utility: {
      populate: {
        Text: true,
      },
    },
    NavBar: {
      populate: {
        LogoText: {
          populate: {
            Logo: true,
            DarkLogo: true,
            Title: true,
          },
        },
      },
    },
    Footer: {
      populate: {
        Social: {
          populate: {
            Link: true,
          },
        },
        SubLink: {
          populate: {
            Link: true,
          },
        },
      },
    },
  };

  await next();
};

export default () => globalPopulate;
