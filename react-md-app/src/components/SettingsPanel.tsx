// ============================================================
// src/components/SettingsPanel.tsx
// Settings dialog using HeadlessUI Dialog
// ============================================================

import React, { Fragment } from 'react'
import { Dialog, Transition, Switch } from '@headlessui/react'
import {
  X,
  Monitor,
  Type,
  Zap,
  Save,
  Info,
} from 'lucide-react'
import type { EditorSettings } from '@/types'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  settings: EditorSettings
  onUpdate: <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => void
  onReset: () => void
}

// ----- Primitives -----

interface SettingRowProps {
  label: string
  description?: string
  children: React.ReactNode
}

function SettingRow({ label, description, children }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-dsm-border/40 last:border-none">
      <div className="flex-1 min-w-0 mr-4">
        <p className="text-sm text-dsm-text">{label}</p>
        {description && (
          <p className="text-xs text-dsm-muted mt-0.5">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}

function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={[
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent',
        'transition-colors duration-200 ease-in-out focus:outline-none',
        checked ? 'bg-dsm-accent' : 'bg-dsm-border',
      ].join(' ')}
      aria-label={label}
    >
      <span
        className={[
          'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow',
          'transition duration-200 ease-in-out',
          checked ? 'translate-x-4' : 'translate-x-0',
        ].join(' ')}
      />
    </Switch>
  )
}

interface SliderProps {
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  label: string
  displayValue?: string
}

function Slider({ value, min, max, step = 1, onChange, label, displayValue }: SliderProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="w-28 accent-dsm-accent"
      />
      <span className="text-xs text-dsm-muted w-12 text-right tabular-nums">
        {displayValue ?? value}
      </span>
    </div>
  )
}

// ----- Section -----
interface SectionProps {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}

function Section({ icon, title, children }: SectionProps) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-dsm-accent">{icon}</span>
        <h3 className="text-xs font-semibold text-dsm-muted uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="bg-dsm-bg/40 rounded-lg px-4">{children}</div>
    </div>
  )
}

// ----- Main Component -----
export function SettingsPanel({
  isOpen,
  onClose,
  settings,
  onUpdate,
  onReset,
}: SettingsPanelProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        {/* Panel */}
        <div className="fixed inset-0 flex items-start justify-end p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-250"
            enterFrom="opacity-0 translate-x-8"
            enterTo="opacity-100 translate-x-0"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-8"
          >
            <Dialog.Panel className="bg-dsm-surface border border-dsm-border rounded-xl shadow-2xl w-96 max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-dsm-border shrink-0">
                <Dialog.Title className="text-base font-semibold text-dsm-text">
                  编辑器设置
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="p-1 rounded hover:bg-white/5 text-dsm-muted hover:text-dsm-text transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin">
                {/* Editor appearance */}
                <Section icon={<Monitor size={14} />} title="外观">
                  <SettingRow label="字体大小" description="编辑器字体大小 (px)">
                    <Slider
                      value={settings.fontSize}
                      min={10}
                      max={22}
                      onChange={(v) => onUpdate('fontSize', v)}
                      label="字体大小"
                      displayValue={`${settings.fontSize}px`}
                    />
                  </SettingRow>
                  <SettingRow label="行高" description="文本行间距">
                    <Slider
                      value={settings.lineHeight}
                      min={1.2}
                      max={2.4}
                      step={0.1}
                      onChange={(v) => onUpdate('lineHeight', v)}
                      label="行高"
                      displayValue={settings.lineHeight.toFixed(1)}
                    />
                  </SettingRow>
                  <SettingRow label="缩进大小" description="Tab 键缩进空格数">
                    <Slider
                      value={settings.tabSize}
                      min={2}
                      max={8}
                      step={2}
                      onChange={(v) => onUpdate('tabSize', v)}
                      label="缩进大小"
                      displayValue={`${settings.tabSize} 格`}
                    />
                  </SettingRow>
                </Section>

                {/* Editor behavior */}
                <Section icon={<Type size={14} />} title="编辑行为">
                  <SettingRow label="自动换行" description="超出宽度自动换行">
                    <Toggle
                      checked={settings.wordWrap}
                      onChange={(v) => onUpdate('wordWrap', v)}
                      label="自动换行"
                    />
                  </SettingRow>
                  <SettingRow label="显示行号" description="在编辑器左侧显示行号">
                    <Toggle
                      checked={settings.showLineNumbers}
                      onChange={(v) => onUpdate('showLineNumbers', v)}
                      label="显示行号"
                    />
                  </SettingRow>
                  <SettingRow label="拼写检查" description="浏览器原生拼写检查">
                    <Toggle
                      checked={settings.spellCheck}
                      onChange={(v) => onUpdate('spellCheck', v)}
                      label="拼写检查"
                    />
                  </SettingRow>
                </Section>

                {/* Preview */}
                <Section icon={<Zap size={14} />} title="预览">
                  <SettingRow label="同步滚动" description="编辑器与预览同步滚动">
                    <Toggle
                      checked={settings.syncScroll}
                      onChange={(v) => onUpdate('syncScroll', v)}
                      label="同步滚动"
                    />
                  </SettingRow>
                </Section>

                {/* Auto-save */}
                <Section icon={<Save size={14} />} title="保存">
                  <SettingRow label="自动保存" description="内容变更后自动保存">
                    <Toggle
                      checked={settings.autosave}
                      onChange={(v) => onUpdate('autosave', v)}
                      label="自动保存"
                    />
                  </SettingRow>
                  {settings.autosave && (
                    <SettingRow label="保存延迟" description="停止输入后多久触发保存">
                      <Slider
                        value={settings.autosaveInterval / 1000}
                        min={1}
                        max={10}
                        onChange={(v) => onUpdate('autosaveInterval', v * 1000)}
                        label="保存延迟"
                        displayValue={`${settings.autosaveInterval / 1000}s`}
                      />
                    </SettingRow>
                  )}
                </Section>

                {/* About */}
                <Section icon={<Info size={14} />} title="关于">
                  <div className="py-3 text-xs text-dsm-muted space-y-1">
                    <p>DSM Markdown Editor v1.0.0</p>
                    <p>为 Synology DS923+ 开发</p>
                    <p>CPU: AMD Ryzen R1600 · 24线程</p>
                    <p>架构: pkgscripts-ng · React · TypeScript</p>
                  </div>
                </Section>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-dsm-border shrink-0">
                <button
                  onClick={onReset}
                  className="text-xs text-dsm-muted hover:text-dsm-text transition-colors"
                >
                  恢复默认
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 text-xs bg-dsm-accent text-white rounded-md hover:bg-dsm-accent/80 transition-colors"
                >
                  完成
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}