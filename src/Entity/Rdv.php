<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"rdv_read"}}
 *     )
 * @ApiFilter(SearchFilter::class, properties={"doctor":"exact"})
 * @ORM\Entity(repositoryClass="App\Repository\RdvRepository")
 */
class Rdv
{
    const HOME_TYPE = 'home-type';
    const OFFICE_TYPE = 'office-type';
    /**
     * @Groups({"rdv_read"})
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"rdv_read"})
     * @ORM\Column(type="datetime")
     */
    private $startAt;

    /**
     * @Groups({"rdv_read"})
     * @ORM\Column(type="string", length=255)
     */
    private $type;

    /**
     * @Groups({"rdv_read"})
     * @ORM\ManyToOne(targetEntity="App\Entity\Status")
     * @ORM\JoinColumn(nullable=false)
     */
    private $status;

    /**
     * @Groups({"rdv_read"})
     * @ORM\Column(type="text")
     */
    private $address;

    /**
     * @Groups({"rdv_read"})
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="rdvs")
     * @ORM\JoinColumn(nullable=false)
     */
    private $patient;

    /**
     * @Groups({"rdv_read"})
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="doctorRdvs")
     * @ORM\JoinColumn(nullable=false)
     */
    private $doctor;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Speciality")
     * @ORM\JoinColumn(nullable=false)
     */
    private $speciality;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartAt(): ?\DateTimeInterface
    {
        return $this->startAt;
    }

    public function setStartAt(\DateTimeInterface $startAt): self
    {
        $this->startAt = $startAt;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getStatus(): ?Status
    {
        return $this->status;
    }

    public function setStatus(Status $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getPatient(): ?User
    {
        return $this->patient;
    }

    public function setPatient(?User $patient): self
    {
        $this->patient = $patient;

        return $this;
    }

    public function getDoctor(): ?User
    {
        return $this->doctor;
    }

    public function setDoctor(?User $doctor): self
    {
        $this->doctor = $doctor;

        return $this;
    }

    public function getSpeciality(): ?Speciality
    {
        return $this->speciality;
    }

    public function setSpeciality(?Speciality $speciality): self
    {
        $this->speciality = $speciality;

        return $this;
    }
}
