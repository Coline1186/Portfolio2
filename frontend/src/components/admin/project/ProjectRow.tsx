import { TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
   CategoryPopularity,
   UpdateCategoryMutationVariables,
} from "@/generated/graphql"
import { UPDATE_CATEGORY } from "@/requetes/mutations/categories.mutations"
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { useMutation } from "@apollo/client"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"

function ProjectRow({
   cat,
   selectedCategory,
   setSelectedCategory,
   refetch,
}: {
   cat: CategoryPopularity
   selectedCategory: string | null
   setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>
   refetch: () => void
}) {
   const { userInfo } = useAuth()

   const [isEditing, setIsEditing] = useState<boolean>(false)
   const [label, setLabel] = useState<string>(cat?.category?.label || "")

   const showModify = useMemo(() => {
      if (
         selectedCategory === null ||
         (!isEditing && selectedCategory === cat.category?.id)
      ) {
         return true
      } else return false
   }, [selectedCategory])

   const [updateCategory] =
      useMutation<UpdateCategoryMutationVariables>(UPDATE_CATEGORY)

   const handleEdit = () => {
      if (cat?.category?.id) {
         setIsEditing(true)
         setSelectedCategory(cat?.category?.id)
         setLabel(cat?.category?.label || "")
      }
   }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLabel(e.target.value)
   }

   const handleCancel = () => {
      setIsEditing(false)
      setSelectedCategory(null)
      setLabel(cat?.category?.label || "")
   }

   const handleSubmit = async () => {
      try {
         await updateCategory({
            variables: {
               data: {
                  editor_id: userInfo?.id,
                  label: label,
                  id: cat.category?.id,
               },
            },
         })
         toast.success("La catégorie a été mise à jour !")
         refetch()
         setIsEditing(false)
         setSelectedCategory(null)
      } catch (error) {
         console.error(error)
         toast.error(
            "Il y a eu une erreur pendant la mise à jour. Veuillez réessayer."
         )
      }
   }
   return (
      <TableRow className={`text-left ${isEditing && "bg-popover"}`}>
         <TableCell className="w-[250px] text-left pr-1">
            <div className="w-full ">
               {isEditing ? (
                  <Input
                     onChange={(e) => handleChange(e)}
                     value={label}
                     className="max-w-full rounded-none shadow-none border-0 ring-0 border-b-2 border-border focus:outline-none focus:ring-0 focus:border-b-2 focus:border-primary focus:shadow-none active:outline-none active:ring-0 focus-visible:ring-0 
    focus-visible:outline-none"
                  />
               ) : (
                  <span className="w-full ml-3">{cat.category?.label}</span>
               )}
            </div>
         </TableCell>
         <TableCell className="text-left w-[100px] pr-1">{cat.books}</TableCell>
         <TableCell className="text-left text-sm text-muted-foreground w-[150px] pr-1">
            {cat.category?.updated_at}
         </TableCell>
         <TableCell className="w-[150px] text-left pr-1">
            {isEditing ? (
               <div className="flex gap-2">
                  <Button
                     onClick={handleCancel}
                     size="sm"
                     className="bg-muted hover:bg-popover text-muted-foreground"
                  >
                     <span className="hidden sm:inline">Annuler</span>
                     <span className="sm:hidden">✕</span>
                  </Button>
                  <Button size="sm" onClick={handleSubmit}>
                     <span className="hidden sm:inline">Enregistrer</span>
                     <span className="sm:hidden">✓</span>
                  </Button>
               </div>
            ) : (
               showModify && (
                  <Button
                     size="sm"
                     className="bg-secondary hover:bg-primary"
                     onClick={handleEdit}
                  >
                     <span className="hidden sm:inline">Modifier</span>
                     <span className="sm:hidden">✎</span>
                  </Button>
               )
            )}
         </TableCell>
      </TableRow>
   )
}

export default ProjectRow
