import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
export default function Register() {
  return (
    <div className="w-full h-screen flex flex-col  items-center bg-zinc-50 font-sans dark:bg-black">
      <header className="text-2xl py-2 font-bold mx-auto">
        Criar sua conta Comeia
      </header>

      <div>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Insira os dados para criação de conta</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="usuario@exemplo.com"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="name-completed">Nome Completo</Label>
                  </div>
                  <Input id="name-completed" type="text" required />
                </div>

                <Label htmlFor="nation">Selecione o país</Label>

                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o país" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Países</SelectLabel>
                      <SelectItem value="apple">Brasil</SelectItem>
                      <SelectItem value="banana">Irlanda</SelectItem>
                      <SelectItem value="blueberry">China</SelectItem>
                      <SelectItem value="grapes">EUA</SelectItem>
                      <SelectItem value="pineapple">Paraguai</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full cursor-pointer">
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
