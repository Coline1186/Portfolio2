import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useMutation } from "@apollo/client"
import { CREATE_CATEGORY } from "@/requetes/mutations/categories.mutations"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import { toast } from "sonner"
import FormSheet from "@/components/layoutElements/FormSheet"

const AddProject = ({ refetch }: { refetch: () => void }) => {
   const { userInfo } = useAuth()
   const [label, setLabel] = useState<string>("")

   const [createCategory, { error: createError }] = useMutation(CREATE_CATEGORY)
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLabel(e.target.value)
   }

   const handleCreate = async () => {
      try {
         await createCategory({
            variables: {
               data: {
                  creator_id: userInfo?.id,
                  label: label,
               },
            },
         })
         toast.success("La catégorie a été créée !")
         refetch()
         setLabel("")
      } catch (error) {
         console.log(error)
         if (createError) {
            toast.error(createError.message)
         }
      }
   }
   return (
      <FormSheet
         onSubmit={handleCreate}
         triggerLabel="Créer une catégorie"
         formTitle="Nouvelle catégorie"
         isDisabled={label === ""}
         formDescription="Une catégorie n'existe pas encore? Créez la ici."
      >
         <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
               <Label htmlFor="cat-label">Nom</Label>
               <Input
                  id="cat-label"
                  value={label}
                  onChange={(e) => handleChange(e)}
               />
            </div>
         </div>
      </FormSheet>
   )
}

export default AddProject
