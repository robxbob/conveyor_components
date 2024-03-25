import * as React from "react"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
        ref={ref}
        style={{ width: '100%' }} // Example inline style
        {...props}
      />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
      ref={ref}
      style={{ borderBottom: '1px solid var(--table-border)', borderTop: '1px solid var(--table-border)'}} // Example inline style
      {...props}
    />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
      ref={ref}
      style={{ borderBottom: '1px solid var(--table-border)' }} // Example inline style
      {...props}
    />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
      ref={ref}
      style={{ borderTop: '1px solid var(--table-border)', color: "var(--table-border)"}} // Example inline style
      {...props}
    />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
  ref={ref}
  style={{}} // Example inline style
  {...props}
/>
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
      ref={ref}
      style={{ textAlign: 'center', borderLeft: '1px solid var(--table-border)', borderRight: '1px solid var(--table-border)'}} // Example inline style
      {...props}
    />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
      ref={ref}
      style={{ textAlign: 'center', borderLeft: '1px solid var(--table-border)', borderRight: '1px solid var(--table-border)'}} // Example inline style
      {...props}
    />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
      ref={ref}
      style={{ marginTop: '4px', fontSize: '14px', color: "var(--text-color)"}} // Example inline style
      {...props}
    />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
