import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import './Select.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useOnClickOutside } from 'Hooks'

export type SelectOptionType = {
  label: string
  value?: string
}

export const Select = ({
  placeholder,
  options,
  selectedOption,
  onChange,
  maxHeight = 250,
}: {
  placeholder: string
  options: SelectOptionType[]
  selectedOption: SelectOptionType | undefined
  onChange: (option: SelectOptionType | undefined) => void
  maxHeight: number
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = () => setIsOpen((prev) => !prev)
  const [selectHasFocused, setSelectHasFocused] = useState(false)
  const [rect, setRect] = useState<DOMRect>()

  const selectRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)

  useOnClickOutside([selectRef, optionsRef], () => setIsOpen(false))

  const measuredWrapperRef = useCallback(
    (node: HTMLDivElement) => {
      if (node !== null) {
        setRect(node.getBoundingClientRect())
      }
    },
    [isOpen],
  )

  /// ///////////////////////////////////////
  // Select element handlers
  const handleSelectClick = () => {
    toggleIsOpen()
  }
  const handleSelectKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ') e.stopPropagation()
    if (e.key === 'Enter' || e.key === ' ') toggleIsOpen()
  }
  const handleSelectKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowUp') e.preventDefault() // prevent page scroll
    if (e.key === 'Escape') setIsOpen(false)
    if (e.key === 'Tab') {
      // trap focus while open
      if (isOpen) e.stopPropagation()
      else setIsOpen(false)
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault() // prevent page scroll
      const selectFirstOption = () => {
        const firstOption = optionsRef.current?.querySelector(
          '.Select__option',
        ) as HTMLDivElement | null | undefined
        firstOption?.focus()
      }
      if (isOpen) {
        selectFirstOption()
      } else {
        setIsOpen(true)
        selectFirstOption()
      }
    }
  }

  /// ///////////////////////////////////////
  // Option element handlers
  const handleOptionClick = (option: SelectOptionType) => {
    onChange(option)
    setIsOpen(false)
  }
  const handleOptionKeyUp = (
    e: React.KeyboardEvent<HTMLDivElement>,
    option: SelectOptionType,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onChange(option)
      setIsOpen(false)
      selectRef.current?.focus()
    }
  }
  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    indexOfCurrentlyFocusedOption: number,
  ) => {
    if (
      // prevent page scroll
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === ' ' ||
      // trap focus
      e.key === 'Tab'
    ) {
      e.preventDefault()
    }
    if (e.key === 'ArrowUp') {
      if (optionsRef.current) {
        const opts = optionsRef.current.querySelectorAll('.Select__option') as
          | NodeListOf<HTMLDivElement>
          | null
          | undefined

        const elementToBeFocused =
          indexOfCurrentlyFocusedOption === 0 // are we on the first option?
            ? selectRef.current
            : opts?.[indexOfCurrentlyFocusedOption - 1]

        elementToBeFocused?.focus()
      }
    }
    if (e.key === 'ArrowDown') {
      if (optionsRef.current) {
        const opts = optionsRef.current.querySelectorAll(
          '.Select__option',
        ) as NodeListOf<HTMLDivElement>
        const nextOption =
          indexOfCurrentlyFocusedOption === opts.length - 1 // are we on the last option?
            ? null
            : opts[indexOfCurrentlyFocusedOption + 1]
        nextOption?.focus()
      }
    }
    if (e.key === 'Escape') {
      setIsOpen(false)
      selectRef.current?.focus()
    }
  }

  // disable spacebar scrolling when focused
  useEffect(() => {
    const noScroll = (e: KeyboardEvent) => e.key === ' ' && e.preventDefault()
    if (selectHasFocused) window.addEventListener('keydown', noScroll)
    else window.removeEventListener('keydown', noScroll)
    return () => window.removeEventListener('keydown', noScroll)
  }, [selectHasFocused])

  // antiscroll
  useEffect(() => {
    const close = () => setIsOpen(false)

    if (isOpen) {
      document.body.style.pointerEvents = 'none' // Blocks scrolling on all scrolling elements (except body, unfortunately)
    } else {
      document.body.style.pointerEvents = ''
    }

    return () => {
      document.body.style.pointerEvents = ''
      window.removeEventListener('scroll', close, true)
    }
  }, [isOpen])

  // close on blur
  useEffect(() => {
    const closeIfBlurred = (e: FocusEvent) => {
      const isFocusedWithinSelectOrOptions =
        selectRef.current?.contains(e.target as Node) ||
        optionsRef.current?.contains(e.target as Node)
      if (!isFocusedWithinSelectOrOptions) setIsOpen(false)
    }

    if (isOpen) document.body.addEventListener('focusin', closeIfBlurred)
    else document.body.removeEventListener('focusin', closeIfBlurred)

    return () => document.body.removeEventListener('focusin', closeIfBlurred)
  }, [isOpen, setIsOpen])

  return (
    <div
      className={`Select ${isOpen ? 'Select--is-open' : ''}`}
      ref={measuredWrapperRef}
    >
      <div
        role="listbox"
        tabIndex={0}
        className={`Select__select ${
          selectedOption ? 'Select__select--has-value' : ''
        }`}
        ref={selectRef}
        onClick={() => {
          handleSelectClick()
          selectRef.current?.focus()
        }}
        onKeyUp={handleSelectKeyUp}
        onKeyDown={handleSelectKeyDown}
        onFocus={() => setSelectHasFocused(true)}
        onBlur={() => setSelectHasFocused(false)}
      >
        <div className="Select__label">
          {selectedOption === undefined ? placeholder : selectedOption.label}
        </div>
        {/* {selectedOption !== undefined && (
          <button
            type="button"
            className="Select__clear-button"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
              onChange(undefined)
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )} */}
        <div aria-hidden className="Select__toggle-mark">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      {isOpen &&
        ReactDOM.createPortal(
          <div
            role="listbox"
            className="Select__options"
            ref={optionsRef}
            style={{
              width: rect?.width,
              top: rect ? rect.bottom + 2 : undefined,
              left: rect?.left,
              maxHeight,
            }}
          >
            {options.map((option, index) => (
              <div
                role="option"
                aria-selected={option === selectedOption}
                tabIndex={-1}
                className={`Select__option${
                  option === selectedOption
                    ? ' Select__option--is-selected'
                    : ''
                }`}
                key={option.label}
                onClick={() => {
                  handleOptionClick(option)
                }}
                onKeyUp={(e) => handleOptionKeyUp(e, option)}
                onKeyDown={(e) => handleOptionKeyDown(e, index)}
              >
                <FontAwesomeIcon
                  className="Select__is-selected-mark"
                  icon={faCheck}
                />
                {option.label}
              </div>
            ))}
          </div>,
          document.body,
        )}
    </div>
  )
}
