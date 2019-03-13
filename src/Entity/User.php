<?php

namespace App\Entity;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
/**
 * @ApiResource(
 *     normalizationContext={"groups"={"user_read"}}
 * )
 * @ApiFilter(SearchFilter::class, properties={"firstname":"partial", "roles": "partial", "specialities.id": "exact"})
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user_read","rdv_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user_read","rdv_read"})
     */
    private $firstname;

    /**
     * @Groups({"user_read","rdv_read"})
     * @ORM\Column(type="string", length=255)
     */
    private $lastname;

    /**
     * @Groups({"user_read"})
     * @ORM\Column(type="string", length=255)
     */
    private $tel;

    /**
     * @Groups({"user_read"})
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @Groups({"user_read"})
     * @ORM\Column(type="text", nullable=true)
     */
    private $address;

    /**
     * @Groups({"user_read"})
     * @ORM\Column(type="datetime")
     */
    private $bornAt;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Rdv", mappedBy="patient", orphanRemoval=true)
     */
    private $rdvs;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Rdv", mappedBy="doctor", orphanRemoval=true)
     */
    private $doctorRdvs;

    /**
     * @Groups({"user_read"})
     * @ORM\ManyToMany(targetEntity="App\Entity\Speciality", inversedBy="users")
     */
    private $specialities;


    /**
     * @var string|null
     * @ORM\Column(name="password", type="string", length=255)
     */
    private $password;


    private $plainPassword;

    /**
     * @var string|null
     * @ORM\Column(name="username", type="string", unique=true, length=50)
     */
    private $username;
    /**
     * @var string|null
     * @ORM\Column(name="token", type="string", length=255, nullable=true)
     * */
    private $token;

    /**
     * @var Boolean|null
     * @ORM\Column(name="enable", type="boolean")
     * */
    private $enable = false;

    /**
     * @var string|null
     * @ORM\Column(name="roles", type="string", length=255, nullable=true)
     */
    private $roles;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"user_read","rdv_read"})
     */
    private $longitude;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"user_read","rdv_read"})
     */
    private $latitude;
    /**
     * @return string|null
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    /**
     * @param string|null $password
     */
    public function setPassword(?string $password): void
    {
        $this->password = $password;
    }

    /**
     * @return mixed
     */
    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    /**
     * @param mixed $plainPassword
     */
    public function setPlainPassword($plainPassword): void
    {
        $this->plainPassword = $plainPassword;
    }

    /**
     * @return string|null
     */
    public function getUsername(): ?string
    {
        return $this->username;
    }

    /**
     * @param string|null $username
     */
    public function setUsername(?string $username): void
    {
        $this->username = $username;
    }

    /**
     * @return string|null
     */
    public function getToken(): ?string
    {
        return $this->token;
    }

    /**
     * @param string|null $token
     */
    public function setToken(?string $token): void
    {
        $this->token = $token;
    }

    /**
     * @return bool|null
     */
    public function getEnable(): ?bool
    {
        return $this->enable;
    }

    /**
     * @param bool|null $enable
     */
    public function setEnable(?bool $enable): void
    {
        $this->enable = $enable;
    }


    public function getRoles()
    {
        $roles = json_decode($this->roles);
        $roles[] = 'ROLE_USER';

        return $roles;
    }

    public function setRoles($roles)
    {
        $this->roles  = json_encode($roles) ;
    }

    public function addRole($role){
        $roles = $this->getRoles();
        $roles[] = $role;
        $this->setRoles($roles);
    }

    public function __construct()
    {
        $this->rdvs = new ArrayCollection();
        $this->doctorRdvs = new ArrayCollection();
        $this->specialities = new ArrayCollection();
        $this->bornAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getTel(): ?string
    {
        return $this->tel;
    }

    public function setTel(string $tel): self
    {
        $this->tel = $tel;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getBornAt(): ?\DateTimeInterface
    {
        return $this->bornAt;
    }

    public function setBornAt(\DateTimeInterface $bornAt): self
    {
        $this->bornAt = $bornAt;

        return $this;
    }

    /**
     * @return Collection|Rdv[]
     */
    public function getRdvs(): Collection
    {
        return $this->rdvs;
    }

    public function addRdv(Rdv $rdv): self
    {
        if (!$this->rdvs->contains($rdv)) {
            $this->rdvs[] = $rdv;
            $rdv->setPatient($this);
        }

        return $this;
    }

    public function removeRdv(Rdv $rdv): self
    {
        if ($this->rdvs->contains($rdv)) {
            $this->rdvs->removeElement($rdv);
            // set the owning side to null (unless already changed)
            if ($rdv->getPatient() === $this) {
                $rdv->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Rdv[]
     */
    public function getDoctorRdvs(): Collection
    {
        return $this->doctorRdvs;
    }

    public function addDoctorRdv(Rdv $doctorRdv): self
    {
        if (!$this->doctorRdvs->contains($doctorRdv)) {
            $this->doctorRdvs[] = $doctorRdv;
            $doctorRdv->setDoctor($this);
        }

        return $this;
    }

    public function removeDoctorRdv(Rdv $doctorRdv): self
    {
        if ($this->doctorRdvs->contains($doctorRdv)) {
            $this->doctorRdvs->removeElement($doctorRdv);
            // set the owning side to null (unless already changed)
            if ($doctorRdv->getDoctor() === $this) {
                $doctorRdv->setDoctor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Speciality[]
     */
    public function getSpecialities(): Collection
    {
        return $this->specialities;
    }

    public function addSpeciality(Speciality $speciality): self
    {
        if (!$this->specialities->contains($speciality)) {
            $this->specialities[] = $speciality;
        }

        return $this;
    }

    public function removeSpeciality(Speciality $speciality): self
    {
        if ($this->specialities->contains($speciality)) {
            $this->specialities->removeElement($speciality);
        }

        return $this;
    }

    public function eraseCredentials()
    {
    }

    public function getSalt(){}

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(?float $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }
}
