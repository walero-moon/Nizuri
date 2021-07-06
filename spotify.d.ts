declare module "spotify-web-api-node" {
    export interface Search {
        body?: Body;
        headers?: Headers;
        statusCode: number;
    }

    export interface Body {
        tracks?: Tracks;
        artists: Artists;
    }

    export interface Tracks {
        href: string;
        items: Track[];
        limit: number;
        next: string;
        offset: number;
        previous: null;
        total: number;
    }

    export interface Track {
        album: Album;
        artists: Artist[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_ids: ExternalIDS;
        external_urls: ExternalUrls;
        href: string;
        id: string;
        is_local: boolean;
        name: string;
        popularity: number;
        preview_url: null | string;
        track_number: number;
        type: ItemType;
        uri: string;
    }

    export interface Artists {
        href: string;
        items: Artist[];
        limit: number;
        next: string;
        offset: number;
        previous: null;
        total: number;
    }
    export interface Album {
        album_type: AlbumTypeEnum;
        artists: Artist[];
        available_markets: string[];
        external_urls: ExternalUrls;
        href: string;
        id: string;
        images: Image[];
        name: string;
        release_date: Date;
        release_date_precision: ReleaseDatePrecision;
        total_tracks: number;
        type: AlbumTypeEnum;
        uri: string;
    }

    export enum AlbumTypeEnum {
        Album = "album",
        Compilation = "compilation",
        Single = "single",
    }

    export interface Artist {
        external_urls: ExternalUrls;
        href: string;
        id: string;
        name: string;
        type: ArtistType;
        followers: Followers;
        genres: string[];
        images: Image[];
        popularity: number;
        uri: string;
    }

    export interface Followers {
        href: null;
        total: number;
    }
    export interface ExternalUrls {
        spotify: string;
    }

    export enum ArtistType {
        Artist = "artist",
    }

    export interface Image {
        height: number;
        url: string;
        width: number;
    }

    export enum ReleaseDatePrecision {
        Day = "day",
    }

    export interface ExternalIDS {
        isrc: string;
    }

    export enum ItemType {
        Track = "track",
    }
    
}

