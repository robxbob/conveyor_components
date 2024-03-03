import { useContext } from "react"

import { Field } from "@/types"
import { camelToSnakeCase, getFieldName } from "@/utils"

import { ConveyorContext } from "./Conveyor"

export const useModelListQuery = (model: string, fields: Field[]) => {
    const { useMQLQuery } = useContext(ConveyorContext)
    const fieldNames = fields.map((field) => getFieldName(field));
    const operationName = `${camelToSnakeCase(model)}_list`
    const document = `
        query ($filter: [[FilterItem!]!], $sort: [String!], $page: Int, $per_page: Int) {
            ${operationName} (filter: $filter, sort: $sort, page: $page, per_page: $per_page) {
                total
                items {
                    id ${fieldNames.join(' ')}
                }              
            }
        }
    `
    return useMQLQuery({ document, operationName })
}