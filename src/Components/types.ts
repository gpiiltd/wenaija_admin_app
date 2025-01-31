import { ReactNode } from "react";

export enum TypographyVariant {
    TITLE,
    SUBTITLE,
    BODY_DEFAULT_MEDIUM,
    BODY_SMALL_MEDIUM,
    SMALL,
    NORMAL,
  }
  
  export interface TypographyProps {
    children: React.ReactNode;
    variant: TypographyVariant;
    className?: string;
  }

  export interface Svgprops {
    type: any;
    className?: string;
    click?: () => void;
  }

  export interface TextInputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    helperText?: string;
    icon?: ReactNode;
    onClick?: () => void;
    focusStyle?: string;
    value?: string;
    setValues?: (value:Record<string,string>) => void;
    setFieldValue?:(a:string, b:string)=> void
    setFieldTouched?:(a: string, b: boolean, c: boolean)=> void
  }

  export interface InstitutionProps {
    name: string;
    address: string;
    hours: string;
    phone: string;
    email: string;
    icon?: string;
  }
  
  export interface StatCardProps {
    title: string;
    value: number;
    icon: string;
    // color?: string;
  } 