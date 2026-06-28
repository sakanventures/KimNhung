import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsBulletin extends Struct.ComponentSchema {
  collectionName: 'components_components_bulletins';
  info: {
    displayName: 'Bulletin';
  };
  attributes: {
    isVertical: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    Text: Schema.Attribute.Component<'components.short-text', true>;
    Variant: Schema.Attribute.Enumeration<['check', 'point']>;
  };
}

export interface ComponentsIconText extends Struct.ComponentSchema {
  collectionName: 'components_components_icon_texts';
  info: {
    displayName: 'IconText';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Icon: Schema.Attribute.Enumeration<['Clock', 'Pin', 'Phone']>;
    isLeft: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    Text: Schema.Attribute.String;
  };
}

export interface ComponentsImageText extends Struct.ComponentSchema {
  collectionName: 'components_components_image_texts';
  info: {
    displayName: 'ImageText';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images'>;
    Title: Schema.Attribute.String;
  };
}

export interface ComponentsInformation extends Struct.ComponentSchema {
  collectionName: 'components_components_information';
  info: {
    displayName: 'Information';
  };
  attributes: {
    Badge: Schema.Attribute.String;
    Description: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface ComponentsLink extends Struct.ComponentSchema {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    Description: Schema.Attribute.String;
    isButton: Schema.Attribute.Boolean;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    Social: Schema.Attribute.Enumeration<
      ['Facebook', 'Instagram', 'LinkedIn', 'TikTok', 'X', 'YouTube']
    >;
    Title: Schema.Attribute.String;
    Url: Schema.Attribute.String;
    Variant: Schema.Attribute.Enumeration<
      ['None', 'Primary', 'Secondary', 'Outline', 'Ghost', 'Underline']
    >;
  };
}

export interface ComponentsLogoText extends Struct.ComponentSchema {
  collectionName: 'components_components_logo_texts';
  info: {
    displayName: 'LogoText';
  };
  attributes: {
    DarkLogo: Schema.Attribute.Media<'images'>;
    Logo: Schema.Attribute.Media<'images'>;
    Title: Schema.Attribute.Component<'components.link', false>;
  };
}

export interface ComponentsRichText extends Struct.ComponentSchema {
  collectionName: 'components_components_rich_texts';
  info: {
    displayName: 'RichText';
  };
  attributes: {
    RichText: Schema.Attribute.Blocks;
  };
}

export interface ComponentsShortText extends Struct.ComponentSchema {
  collectionName: 'components_components_short_texts';
  info: {
    displayName: 'ShortText';
  };
  attributes: {
    Text: Schema.Attribute.String;
  };
}

export interface ComponentsSocial extends Struct.ComponentSchema {
  collectionName: 'components_components_socials';
  info: {
    displayName: 'Social';
  };
  attributes: {
    Link: Schema.Attribute.Component<'components.link', true>;
    Title: Schema.Attribute.String;
  };
}

export interface ComponentsSubLink extends Struct.ComponentSchema {
  collectionName: 'components_components_sub_links';
  info: {
    displayName: 'SubLink';
  };
  attributes: {
    Link: Schema.Attribute.Component<'components.link', true>;
    Title: Schema.Attribute.String;
  };
}

export interface ContentsHeroContents extends Struct.ComponentSchema {
  collectionName: 'components_contents_hero_contents';
  info: {
    displayName: 'HeroContents';
  };
  attributes: {
    Badge: Schema.Attribute.String;
    Color: Schema.Attribute.Enumeration<
      ['Black', 'Blue', 'Brown', 'Green', 'Orange', 'Red', 'Yellow', 'White']
    >;
    Description: Schema.Attribute.String;
    Icon: Schema.Attribute.Enumeration<['Bread', 'Fish']>;
    Image: Schema.Attribute.Media<'images'>;
    isPrimary: Schema.Attribute.Boolean;
    Link: Schema.Attribute.Component<'components.link', true>;
    Title: Schema.Attribute.String;
  };
}

export interface ContentsMapContents extends Struct.ComponentSchema {
  collectionName: 'components_contents_map_contents';
  info: {
    displayName: 'MapContents';
  };
  attributes: {
    Aisle: Schema.Attribute.Component<'components.image-text', true>;
    Badge: Schema.Attribute.String;
    Description: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface ContentsShowcaseContents extends Struct.ComponentSchema {
  collectionName: 'components_contents_showcase_contents';
  info: {
    displayName: 'ShowcaseContents';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images'>;
    Link: Schema.Attribute.Component<'components.link', true>;
    Title: Schema.Attribute.String;
  };
}

export interface ContentsStoryContents extends Struct.ComponentSchema {
  collectionName: 'components_contents_story_contents';
  info: {
    displayName: 'StoryContents';
  };
  attributes: {
    Badge: Schema.Attribute.String;
    Description: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images'>;
    RichText: Schema.Attribute.Component<'components.rich-text', true>;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutsAnnouncement extends Struct.ComponentSchema {
  collectionName: 'components_layouts_announcements';
  info: {
    displayName: 'Announcement';
  };
  attributes: {
    RichText: Schema.Attribute.Component<'components.rich-text', true>;
  };
}

export interface LayoutsCommunity extends Struct.ComponentSchema {
  collectionName: 'components_layouts_communities';
  info: {
    displayName: 'Community';
  };
  attributes: {
    Info: Schema.Attribute.Component<'components.information', true>;
  };
}

export interface LayoutsDeals extends Struct.ComponentSchema {
  collectionName: 'components_layouts_deals';
  info: {
    displayName: 'Deals';
  };
  attributes: {
    Badge: Schema.Attribute.String;
    Description: Schema.Attribute.String;
    Link: Schema.Attribute.Component<'components.link', true>;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutsEatery extends Struct.ComponentSchema {
  collectionName: 'components_layouts_eateries';
  info: {
    displayName: 'Eatery';
  };
  attributes: {
    Badge: Schema.Attribute.String;
    Description: Schema.Attribute.String;
    Info: Schema.Attribute.Component<'components.information', true>;
    RichText: Schema.Attribute.Component<'components.rich-text', true>;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutsFooter extends Struct.ComponentSchema {
  collectionName: 'components_layouts_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    Logo: Schema.Attribute.Component<'components.logo-text', true>;
    Social: Schema.Attribute.Component<'components.social', true>;
    SubLink: Schema.Attribute.Component<'components.sub-link', true>;
  };
}

export interface LayoutsHero extends Struct.ComponentSchema {
  collectionName: 'components_layouts_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    Hero: Schema.Attribute.Component<'contents.hero-contents', true>;
  };
}

export interface LayoutsLocation extends Struct.ComponentSchema {
  collectionName: 'components_layouts_locations';
  info: {
    displayName: 'Location';
  };
  attributes: {
    Info: Schema.Attribute.Component<'components.information', true>;
    Text: Schema.Attribute.Component<'components.icon-text', true>;
  };
}

export interface LayoutsMap extends Struct.ComponentSchema {
  collectionName: 'components_layouts_maps';
  info: {
    displayName: 'Map';
  };
  attributes: {
    Map: Schema.Attribute.Component<'contents.map-contents', false>;
  };
}

export interface LayoutsNavBar extends Struct.ComponentSchema {
  collectionName: 'components_layouts_nav_bars';
  info: {
    displayName: 'NavBar';
  };
  attributes: {
    LogoText: Schema.Attribute.Component<'components.logo-text', false>;
  };
}

export interface LayoutsNewsletter extends Struct.ComponentSchema {
  collectionName: 'components_layouts_newsletters';
  info: {
    displayName: 'Newsletter';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images'>;
    Info: Schema.Attribute.Component<'components.information', true>;
    Text: Schema.Attribute.Component<'components.short-text', true>;
  };
}

export interface LayoutsShowcase extends Struct.ComponentSchema {
  collectionName: 'components_layouts_showcases';
  info: {
    displayName: 'Showcase';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Link: Schema.Attribute.Component<'components.link', true>;
    Showcase: Schema.Attribute.Component<'contents.showcase-contents', true>;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutsStory extends Struct.ComponentSchema {
  collectionName: 'components_layouts_stories';
  info: {
    displayName: 'Story';
  };
  attributes: {
    Bulletin: Schema.Attribute.Component<'components.bulletin', true>;
    Story: Schema.Attribute.Component<'contents.story-contents', true>;
  };
}

export interface LayoutsSubFooter extends Struct.ComponentSchema {
  collectionName: 'components_layouts_sub_footers';
  info: {
    displayName: 'SubFooter';
  };
  attributes: {
    Text: Schema.Attribute.Component<'components.icon-text', true>;
  };
}

export interface LayoutsUtility extends Struct.ComponentSchema {
  collectionName: 'components_layouts_utilities';
  info: {
    displayName: 'Utility';
  };
  attributes: {
    Text: Schema.Attribute.Component<'components.icon-text', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.bulletin': ComponentsBulletin;
      'components.icon-text': ComponentsIconText;
      'components.image-text': ComponentsImageText;
      'components.information': ComponentsInformation;
      'components.link': ComponentsLink;
      'components.logo-text': ComponentsLogoText;
      'components.rich-text': ComponentsRichText;
      'components.short-text': ComponentsShortText;
      'components.social': ComponentsSocial;
      'components.sub-link': ComponentsSubLink;
      'contents.hero-contents': ContentsHeroContents;
      'contents.map-contents': ContentsMapContents;
      'contents.showcase-contents': ContentsShowcaseContents;
      'contents.story-contents': ContentsStoryContents;
      'layouts.announcement': LayoutsAnnouncement;
      'layouts.community': LayoutsCommunity;
      'layouts.deals': LayoutsDeals;
      'layouts.eatery': LayoutsEatery;
      'layouts.footer': LayoutsFooter;
      'layouts.hero': LayoutsHero;
      'layouts.location': LayoutsLocation;
      'layouts.map': LayoutsMap;
      'layouts.nav-bar': LayoutsNavBar;
      'layouts.newsletter': LayoutsNewsletter;
      'layouts.showcase': LayoutsShowcase;
      'layouts.story': LayoutsStory;
      'layouts.sub-footer': LayoutsSubFooter;
      'layouts.utility': LayoutsUtility;
    }
  }
}
