import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsIconText extends Struct.ComponentSchema {
  collectionName: 'components_components_icon_texts';
  info: {
    displayName: 'IconText';
  };
  attributes: {
    Icon: Schema.Attribute.Enumeration<['Clock', 'Pin', 'Phone']>;
    isLeft: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    Text: Schema.Attribute.String;
  };
}

export interface ComponentsLink extends Struct.ComponentSchema {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    Description: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    Text: Schema.Attribute.String;
    Url: Schema.Attribute.String;
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

export interface LayoutsAnnouncement extends Struct.ComponentSchema {
  collectionName: 'components_layouts_announcements';
  info: {
    displayName: 'Announcement';
  };
  attributes: {
    RichText: Schema.Attribute.Component<'components.rich-text', true>;
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
      'components.icon-text': ComponentsIconText;
      'components.link': ComponentsLink;
      'components.logo-text': ComponentsLogoText;
      'components.rich-text': ComponentsRichText;
      'layouts.announcement': LayoutsAnnouncement;
      'layouts.nav-bar': LayoutsNavBar;
      'layouts.utility': LayoutsUtility;
    }
  }
}
