import React, { FC } from 'react'
import { ClipLoader } from 'react-spinners'
import { ButtonProps } from './types'

const ButtonComponent: FC<ButtonProps> = ({
  text,
  loading,
  onClick,
  active,
  bg_color,
  text_color,
  border_color,
  icon,
}) => {
  return (
    <div
      style={{
        cursor: active ? 'pointer' : 'default',
        fontSize: '1rem',
        borderRadius: '0.380rem',
        transition: 'all 0.3s',
        backgroundColor: bg_color,
        color: text_color,
        opacity: active ? 1 : 0.3,
        borderColor: active ? border_color : 'transparent',
        borderStyle: 'solid',
        padding: '0.5rem 0.6rem',
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // minWidth: "120px",
      }}
    >
      <button
        onClick={onClick}
        disabled={loading || !active}
        style={{
          border: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1rem',
          letterSpacing: '0.05em',
          fontWeight: '500',
          backgroundColor: 'transparent',
          width: '100%',
          position: 'relative',
        }}
      >
        <span
          style={{
            visibility: loading ? 'hidden' : 'visible',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>{text}</span>

          {icon && <span>{icon}</span>}
        </span>
        {loading && (
          <span
            style={{
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ClipLoader color="#B8C1CB" size={24} />
          </span>
        )}
      </button>
    </div>
  )
}

export default ButtonComponent
